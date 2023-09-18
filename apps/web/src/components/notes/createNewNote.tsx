import { SubmitHandler, useForm } from 'react-hook-form'
import { createNewNoteSchema } from '@monorepo/shared/validationSchemas/api/notes'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormInput } from 'ui/src/components/form-input/form-input'
import { Button } from 'ui/src/components/button/button'

type NewNoteForm = z.infer<typeof createNewNoteSchema>

const translations = {
  form: {
    label: {
      assigneeName: "Assigned person's name",

      text: 'Content'
    }
  }
} as const satisfies Record<string, unknown> & { form: { label: NewNoteForm } }
export type CreateNewNoteProps = {
  onSubmit: SubmitHandler<NewNoteForm>
  isFormLoading: boolean
}
export const CreateNewNote = ({
  onSubmit,
  isFormLoading
}: CreateNewNoteProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<NewNoteForm>({
    resolver: zodResolver(createNewNoteSchema)
  })

  return (
    <div className="flex flex-col items-start gap-4 px-4 py-2 bg-gradient-to-b from-slate-600 to-slate-700 rounded-2xl drop-shadow-md">
      <span className="text-3xl text-white text-bold">
        Create new note here:
      </span>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormInput
          {...register('text')}
          errorMsg={errors.text?.message}
          placeholder={translations.form.label.text}
        />
        <FormInput
          {...register('assigneeName')}
          errorMsg={errors.assigneeName?.message}
          placeholder={translations.form.label.assigneeName}
        />
        <Button type="submit" isLoading={isFormLoading}>
          submit
        </Button>
      </form>
    </div>
  )
}
