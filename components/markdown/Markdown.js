import marked from "marked";

export default function Markdown({
  markdown,
  editable,
  onEdit,
  editorClassName,
}) {
  function getMarkdownText() {
    const rawMarkup = marked(markdown);
    return { __html: rawMarkup };
  }

  if (editable)
    return (
      <textarea
        className={editorClassName}
        onChange={(e) => onEdit(e.target.value)}
        placeholder="The WRITE ZONE"
        value={markdown}
      />
    );
  else return <div dangerouslySetInnerHTML={getMarkdownText()} />;
}
