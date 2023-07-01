type Props = {}

const ProductAttributes = (props: Props) => {
  return (
    <div
      className="divide-y
        divide-gray-200
        [&>div]:grid
        [&>div]:grid-cols-1
        [&>div]:gap-2
        [&>div]:py-3
        md:[&>div]:grid-cols-[3fr_9fr]
        md:[&>div]:gap-4"
    >
      <div>
        <span className="inline-block text-sm font-medium text-gray-400 md:text-left md:text-base">
          ابعاد
        </span>
        <span className="inline-block">10×20×40</span>
      </div>
      <div>
        <span className="inline-block text-sm font-medium text-gray-400 md:text-left md:text-base">
          جنس
        </span>
        <span className="inline-block">سبک معدنی دیواری</span>
      </div>
      <div>
        <span className="inline-block text-sm font-medium text-gray-400 md:text-left md:text-base">
          وزن
        </span>
        <span className="inline-block">۴ کیلوگرم</span>
      </div>
      <div>
        <span className="inline-block text-sm font-medium text-gray-400 md:text-left md:text-base">
          جذب آب (%)
        </span>
        <span className="inline-block"></span>
      </div>
      <div>
        <span className="inline-block text-sm font-medium text-gray-400 md:text-left md:text-base">
          مقاومت فشاری (N/mm^2)
        </span>
        <span className="inline-block"></span>
      </div>
      <div>
        <span className="inline-block text-sm font-medium text-gray-400 md:text-left md:text-base">
          مقاومت خمشی
        </span>
        <span className="inline-block"></span>
      </div>
      <div>
        <span className="inline-block text-sm font-medium text-gray-400 md:text-left md:text-base">
          زمان گیرایش اولیه
        </span>
        <span className="inline-block"></span>
      </div>
      <div>
        <span className="inline-block text-sm font-medium text-gray-400 md:text-left md:text-base">
          زمان گیرایی ثانویه
        </span>
        <span className="inline-block"></span>
      </div>
    </div>
  )
}

export default ProductAttributes
