import { Button } from "@core/components/Button"

const StorybookIndex = () => {
  return (
    <>
      <div className="flex flex-col gap-12">
        <div className="flex items-center gap-8">
          <Button intent="primary" size="xsmall">
            کلیک کن!
          </Button>
          <Button intent="primary" size="small">
            کلیک کن!
          </Button>
          <Button intent="primary" size="DEFAULT">
            کلیک کن!
          </Button>
          <Button intent="primary" size="medium">
            کلیک کن!
          </Button>
          <Button intent="primary" size="large">
            کلیک کن!
          </Button>
          <Button intent="primary" size="xlarge">
            کلیک کن!
          </Button>
        </div>
        <div className="flex items-center gap-8">
          <Button intent="secondary" size="xsmall">
            کلیک کن!
          </Button>
          <Button intent="secondary" size="small">
            کلیک کن!
          </Button>
          <Button intent="secondary" size="DEFAULT">
            کلیک کن!
          </Button>
          <Button intent="secondary" size="medium">
            کلیک کن!
          </Button>
          <Button intent="secondary" size="large">
            کلیک کن!
          </Button>
          <Button intent="secondary" size="xlarge">
            کلیک کن!
          </Button>
        </div>
        <div className="flex items-center gap-8">
          <Button intent="danger" size="xsmall">
            کلیک کن!
          </Button>
          <Button intent="danger" size="small">
            کلیک کن!
          </Button>
          <Button intent="danger" size="DEFAULT">
            کلیک کن!
          </Button>
          <Button intent="danger" size="medium">
            کلیک کن!
          </Button>
          <Button intent="danger" size="large">
            کلیک کن!
          </Button>
          <Button intent="danger" size="xlarge">
            کلیک کن!
          </Button>
        </div>
        <div className="flex items-center gap-8">
          <Button intent="ghost" size="xsmall">
            کلیک کن!
          </Button>
          <Button intent="ghost" size="small">
            کلیک کن!
          </Button>
          <Button intent="ghost" size="DEFAULT">
            کلیک کن!
          </Button>
          <Button intent="ghost" size="medium">
            کلیک کن!
          </Button>
          <Button intent="ghost" size="large">
            کلیک کن!
          </Button>
          <Button intent="ghost" size="xlarge">
            کلیک کن!
          </Button>
        </div>
      </div>
    </>
  )
}

export default StorybookIndex
