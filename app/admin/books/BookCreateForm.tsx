"use client";

export default function BookCreateForm({
  authors,
}: {
  authors: any[];
}) {
  const safeAuthors = Array.isArray(authors) ? authors : [];

  return (
    <form
      action="/api/admin/books/action"
      method="POST"
      encType="multipart/form-data"
      style={{ maxWidth: 500 }}
    >
      <input type="hidden" name="action" value="create" />

      <div style={{ marginBottom: 12 }}>
        <input
          name="title"
          placeholder="عنوان الكتاب"
          required
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <input
          type="file"
          name="cover"
          accept="image/*"
          required
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <select name="author_id" required style={{ width: "100%" }}>
          <option value="">اختر الكاتب</option>
          {safeAuthors.map((a) => (
            <option key={a.id} value={a.id}>
              {a.first_name} {a.last_name}
            </option>
          ))}
        </select>
      </div>

      <button>إضافة الكتاب</button>
    </form>
  );
}



