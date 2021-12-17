export default function CreateItemModel({ onCancel, onSubmit }) {
  return (
    <div className={styles.itemCreator}>
      <form onSubmit={createItem}>
        <input type="text" placeholder="Item Name / Description" required />
        <input type="number" placeholder="Price" required />
        <S3Upload
          label="Upload Image"
          onUpload={(imageKey) => {
            setNewItem({ ...newItem, imageKey });
          }}
          className="mx-auto"
        />
        <div className={styles.s3ImageContainer}>
          <S3Image imageKey={newItem.imageKey} alt="choose an image" />
        </div>
        <div>
          <input type="submit" value="Create Catering Item" />
          <input
            type="button"
            value="Cancel"
            onClick={() => {
              visable = false;
            }}
          />
        </div>
      </form>
    </div>
  );
}
