import React from "react";

export default function Paginado({ pokePage,allPoke,paginado }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allPoke/ pokePage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <div >
        {pageNumber &&
          pageNumber.map((n ) => (
            <button className="btn" onClick={() => paginado(n)} key={n}>
              {n}
            </button>
          ))}
      </div>
    </nav>
  );
}