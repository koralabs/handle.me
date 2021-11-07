import React from "react";

import SEO from "../components/seo";

function NotFoundPage() {
  return (
    <>
      <SEO title="404: Not found" />
      <section className="z-0 md:max-w-xl mx-auto relative">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-8 md:col-start-3 gap-4 bg-dark-200 rounded-lg shadow-lg place-content-start p-4 lg:p-8 mb-16">
            <h2 className="bg-yellow-400 text-2xl font-bold inline-block my-8 p-3">
              Looks like this page is a ghost that got abducted by aliens...
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFoundPage;
