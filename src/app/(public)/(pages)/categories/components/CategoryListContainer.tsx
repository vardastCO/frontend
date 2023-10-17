"use client"

import React, { PropsWithChildren, useState } from "react"

const CategoryListContainer: React.FC<
  PropsWithChildren<{ isSubcategory?: boolean; description?: string }>
> = ({ isSubcategory, description, children }) => {
  const [more, setMore] = useState(false)

  return (
    <>
      {description && (
        <div className="flex flex-col gap-y bg-alpha-white p">
          <h4 className="text-alpha-500">درباره دسته بندی</h4>
          {description.split("\n\n").map((paragraph, index) => (
            <p
              key={index}
              className={`${
                more ? "" : "line-clamp-3"
              } text-justify text-sm leading-6`}
            >
              {paragraph}
            </p>
          ))}
          {!more && (
            <span
              className="text-left text-primary underline"
              onClick={() => {
                setMore(!more)
              }}
            >
              بیشتر
            </span>
          )}
        </div>
      )}
      <ul
        className={`grid grid-cols-2 ${
          isSubcategory ? "grid-rows-4" : "grid-rows-2"
        } gap-4 divide-alpha-200 p-6`}
      >
        {children}
      </ul>
    </>
  )
}

export default CategoryListContainer
