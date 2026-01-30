"use client";

export default function LanguageSwitcher() {
  const changeLang = (lang: string) => {
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (!select) return;

    select.value = "";
    select.dispatchEvent(new Event("change"));

    setTimeout(() => {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    }, 100);
  };

  return (
    <div
      className="notranslate"
      translate="no"
      style={{ display: "flex", gap: "10px" }}
    >
      <button className="notranslate" translate="no" type="button" onClick={() => changeLang("ar")}>
        AR
      </button>
      <button className="notranslate" translate="no" type="button" onClick={() => changeLang("fr")}>
        FR
      </button>
      <button className="notranslate" translate="no" type="button" onClick={() => changeLang("en")}>
        EN
      </button>
    </div>
  );
}

