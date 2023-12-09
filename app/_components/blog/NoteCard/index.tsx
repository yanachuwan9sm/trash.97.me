type NoteCardProps = {
  children: React.ReactNode
}

export const NoteCard = (props: NoteCardProps) => {
  return (
    <div className='mb-8 w-full rounded border border-mauve4 p-3  text-sm'>
      {props.children}
    </div>
  )
}
