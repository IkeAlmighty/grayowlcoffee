import { useState, useEffect, useRef } from "react";
import Markdown from "./Markdown";
import styles from "./markdownEditor.module.css";

export default function MarkdownEditor({
  markdown, //optional
  title, //optional
  isAdmin,
  onSave,
  onPublish,
}) {
  const [_markdown, set_markdown] = useState(
    markdown || `# ${title}\n\n` || "# Untitled\n\n"
  );
  const [_title, set_title] = useState(title || getParsedTitle());
  const [editable, setEditable] = useState(isAdmin); // start in edit mode if logged in as an admin

  const lastEditTimeStamp = useRef(undefined);

  function getParsedTitle() {
    let stringBuffer = "";
    let titleStartFound = false;
    for (let i = 0; i < _markdown.length; i++) {
      const char = _markdown.charAt(i);
      switch (char) {
        case "#":
          titleStartFound = true;
          break;
        case "\n":
          if (titleStartFound) {
            return stringBuffer.trim();
          }
          break;
        default:
          if (titleStartFound) {
            stringBuffer += char;
          }
          break;
      }
    }

    return "Untitled";
  }

  // The following useEffect is used
  // to auto save the document when the
  // user has stopped typing for a couple seconds.
  useEffect(() => {
    lastEditTimeStamp.current = Date.now();

    const timeout = setTimeout(async () => {
      if (lastEditTimeStamp.current) {
        // console.log(Date.now(), lastEditTimeStamp.current);
        if (Date.now() - lastEditTimeStamp.current >= 900) {
          await onSave({ title: _title, markdown: _markdown });
          lastEditTimeStamp.current = undefined;
          return;
        }
      }
    }, 1000);

    timeout();
  }, [_markdown, _title, onSave]);

  // setInterval(async () => {
  //   await onSave({ title: _title, markdown: _markdown });
  // }, 30000);

  return (
    <div>
      <div className={styles.markdownContainer}>
        <Markdown
          markdown={_markdown}
          editorClassName="p-1 w-100 h-100"
          editable={editable}
          onEdit={(value) => {
            set_markdown(value);
            set_title(getParsedTitle());
          }}
        />
        {isAdmin && (
          <div className={styles.controlPanel}>
            <input
              type="button"
              value={editable ? "View HTML" : "View Markdown  "}
              onClick={() => {
                setEditable(!editable);
              }}
            />
            <input type="button" value="Add Image" />
            <input
              style={{ color: "green" }}
              type="button"
              value="|  Publish  |"
              onClick={() => {
                onPublish({
                  title: _title,
                  markdown: _markdown,
                });
              }}
            />
            <input style={{ color: "red" }} type="button" value="  Delete  " />
          </div>
        )}
      </div>
    </div>
  );
}
