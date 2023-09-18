'use client'
import { NoteDisplayer } from '../components/notes/noteDisplayer'
import { trpc } from '../utils/trpc'
import {
  CreateNewNote,
  CreateNewNoteProps
} from '../components/notes/createNewNote'
import { useCallback } from 'react'

const MainPage = (): JSX.Element => {
  const trpcContext = trpc.useContext()

  const { data: notesData } = trpc.notes.getNotes.useQuery()
  const { mutate: createNote, isLoading: isNewNoteCreationLoading } =
    trpc.notes.createNote.useMutation({
      onSuccess: () => {
        trpcContext.notes.getNotes.refetch()
      }
    })
  const { mutate: deleteNote } = trpc.notes.deleteNote.useMutation({
    onSuccess: () => {
      trpcContext.notes.getNotes.refetch()
    }
  })

  const onCreateNewNoteSubmit = useCallback<CreateNewNoteProps['onSubmit']>(
    (vals) => {
      console.log({ vals })
      createNote(vals)
    },
    [createNote]
  )

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-blue-600 to-blue-700 ">
      <CreateNewNote
        onSubmit={onCreateNewNoteSubmit}
        isFormLoading={isNewNoteCreationLoading}
      />
      <h1 className="text-3xl text-white text-bold">Notes:</h1>
      <div className="flex flex-row flex-wrap">
        {notesData?.map((note) => (
          <NoteDisplayer
            key={note.id}
            note={note}
            onDeleteNote={() => deleteNote({ id: note.id })}
          />
        ))}
      </div>
    </div>
  )
}

export default MainPage
