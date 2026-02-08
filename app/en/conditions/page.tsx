export const dynamic = "force-dynamic";

export default function ConditionsPageEn() {
  return (
    <main className="content-page conditions-page" dir="ltr">
      <h1 className="content-title-lg">Terms and Conditions</h1>

      <div className="conditions-content">
        <section>
          <h2>1. Legal status</h2>
          <p>
            The Canadian Union of Arab Migrant Writers is a non-profit cultural
            organization (NPO), registered in the Province of Québec (Canada).
            Its mission is to support migrant literature and authors whose work
            emerges from migratory experiences.
          </p>
        </section>

        <section>
          <h2>2. Membership</h2>
          <p>
            Membership in the Union is free of charge and open to migrant writers
            as well as to individuals active in the literary and cultural fields.
          </p>
          <p>
            Submitting a membership application constitutes acknowledgement of
            having read and accepted these terms and conditions.
          </p>
        </section>

        <section>
          <h2>3. Publication and content</h2>
          <p>
            The literary and intellectual rights to submitted texts and materials
            remain the exclusive property of their authors.
          </p>
          <p>
            The Union reserves the right to present texts or excerpts thereof on
            its digital platforms for cultural and informational purposes only,
            without any commercial exploitation.
          </p>
        </section>

        <section>
          <h2>4. Translation</h2>
          <p>
            Certain works may be included in translation projects into French or
            English, whether on a voluntary or supported basis, depending on the
            Union’s programs and capacities.
          </p>
          <p>
            No translation or publication may be carried out without the prior
            knowledge and consent of the author.
          </p>
        </section>

        <section>
          <h2>5. Use of the website</h2>
          <p>
            Users agree to use the Union’s platforms in a lawful and ethical
            manner and to refrain from publishing any content that violates
            applicable laws or infringes upon the dignity of others.
          </p>
        </section>

        <section>
          <h2>6. Protection of personal data</h2>
          <p>
            Personal data collected are used exclusively within the framework of
            the Union’s activities and are not shared with any third party
            without explicit consent, in accordance with applicable data
            protection laws.
          </p>
        </section>

        <section>
          <h2>7. Amendments</h2>
          <p>
            The Union reserves the right to amend these terms and conditions at
            any time. The updated version will be published on the website.
          </p>
        </section>

        <section>
          <h2>8. Acceptance</h2>
          <p>
            Use of the website or submission of any request (membership,
            manuscript, participation) constitutes full and unconditional
            acceptance of these terms and conditions.
          </p>
        </section>
      </div>

      {/* BOTTOM ACTION */}
      <div className="conditions-bottom">
        <a href="/en" className="conditions-close">
          Close and return to the home page
        </a>
      </div>
    </main>
  );
}


