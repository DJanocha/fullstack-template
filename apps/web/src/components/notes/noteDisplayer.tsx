import type { RouterOutputs } from '../../utils/trpc'
import { format } from 'date-fns'
import { Button } from 'ui/src/components/button/button'
import { Icon } from 'ui/src/components/icon/icon'
type Note = RouterOutputs['notes']['getNotes'][number]

export const NoteDisplayer = ({
  note,
  onDeleteNote
}: {
  note: Note
  onDeleteNote: () => void
}) => {
  return (
    <div className="flex flex-col items-center p-2 bg-orange-100 border-2 border-green-300 rounded-xl">
      <span className="text-2xl text-blue-700">{note.text}</span>
      <span>{note.assigneeName}</span>
      <span>{format(note.createdAt, 'yyyy-mm-dd, hh:mm')}</span>
      {note.done ? (
        <span className="text-xl text-white bg-green-400"> DONE</span>
      ) : (
        <span className="px-3 py-1 text-xl text-white bg-red-500 rounded-md">
          not done
        </span>
      )}
      <Button onClick={onDeleteNote} variant="link" className="">
        <Icon name="trash" />
      </Button>
    </div>
  )
}
