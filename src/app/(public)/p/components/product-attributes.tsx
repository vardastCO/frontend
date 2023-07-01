type Props = {}

const ProductAttributes = (props: Props) => {
  return (
    <div
      className="divide-y
        divide-gray-200
        [&_div]:grid
        [&_div]:grid-cols-[3fr_9fr]
        [&_div]:gap-4
        [&_div]:py-3"
    >
      <div>
        <span className="inline-block text-left font-medium text-gray-400">
          ابعاد
        </span>
        <span className="inline-block">10×20×40</span>
      </div>
      <div>
        <span className="inline-block text-left font-medium text-gray-400">
          جنس
        </span>
        <span className="inline-block">سبک معدنی دیواری</span>
      </div>
      <div>
        <span className="inline-block text-left font-medium text-gray-400">
          وزن
        </span>
        <span className="inline-block">۴ کیلوگرم</span>
      </div>
      <div>
        <span className="inline-block text-left font-medium text-gray-400">
          جذب آب (%)
        </span>
        <span className="inline-block"></span>
      </div>
      <div>
        <span className="inline-block text-left font-medium text-gray-400">
          مقاومت فشاری (N/mm^2)
        </span>
        <span className="inline-block"></span>
      </div>
      <div>
        <span className="inline-block text-left font-medium text-gray-400">
          مقاومت خمشی
        </span>
        <span className="inline-block"></span>
      </div>
      <div>
        <span className="inline-block text-left font-medium text-gray-400">
          زمان گیرایش اولیه
        </span>
        <span className="inline-block"></span>
      </div>
      <div>
        <span className="inline-block text-left font-medium text-gray-400">
          زمان گیرایی ثانویه
        </span>
        <span className="inline-block"></span>
      </div>
    </div>
  )
}

export default ProductAttributes
