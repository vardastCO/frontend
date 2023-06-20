// @ts-nocheck

const StorybookFormPage = () => {
  //   z.setErrorMap(zodI18nMap)
  //   const CreateBrandSchema = z.object({
  //     name: z.string()
  //   })
  //   type CreateBrandType = TypeOf<typeof CreateBrandSchema>

  //   const form = useForm<CreateBrandType>({
  //     resolver: zodResolver(CreateBrandSchema),
  //     defaultValues: {}
  //   })

  //   function onSubmit(data: CreateBrandType) {
  //     const { name } = data
  //   }
  return (
    <>
      {/* <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام و نام خانوادگی</FormLabel>
                <FormControl size="xsmall">
                  <Input {...field} placeholder="مقدار را وارد کن..." />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form> */}
    </>
  )
}

export default StorybookFormPage
