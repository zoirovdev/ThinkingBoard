import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router"
import api from "../lib/axios.js"
import toast from "react-hot-toast"
import { Loader, ArrowLeft, Trash2 } from "lucide-react"



const NoteDetailPage = () => {
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    const fetchNote = async() => {
      try {
        const res = await api.get(`/notes/${id}`)
	setNote(res.data)
      } catch (error) {
	console.log("Error in fetching note")
        toast.error("Failed to fetch the note")
	
      } finally {
	setLoading(false)
      }
    }

    fetchNote()
  }, [])

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted")
      navigate("/")
    } catch (error) {
	console.log("Error deleting the note")
	toast.error("Failed to delete note")
    } 
  }

  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please add a title or content")
      return
    }

    setSaving(true)

    try {
      await api.put(`/notes/${id}`, note)
      toast.success("Note updated successfully!")
      navigate("/")
    } catch (error) {
      console.log("Error saving the note:", error)
      toast.error("Failed to update note")
    } finally {
      setSaving(false)
    }
  }

  if(loading){
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <Loader className="animate-spin size-10"/>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
	<div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="btn btn-ghost">
              <ArrowLeft className="h-5 w-5"/>	
	      Back to Notes
	    </Link>
	    <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2 className="h-5 w-5"/>
	      Delete Note
	    </button>
	  </div>

	  <div className="card bg-base-100">
	    <div className="card-body">
	      <div className="form-control mb-4 flex flex-col gap-2">
		<label className="label">
		  <span className="label-text">Title</span>
		</label>
		<input 
                  type="text"
		  placeholder="Note title"
		  className="input input-bordered w-[100%] h-12"
		  value={note.title}
		  onChange={(e) => setNote({ ...note, title: e.target.value })}
		/>
	      </div>

	      <div className="form-control mb-4 flex flex-col gap-2">
		<label className="label">
		  <span className="label-text">Content</span>
		</label>
		<textarea 
		  placeholder="Write your note here..."
		  className="textarea textarea-bordered h-36 w-[100%]"
		  value={note.content}
		  onChange={(e) => setNote({ ...note, content: e.target.value })}
		/>
	      </div>

	      <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
		  {saving ? "Saving..." : "Save Changes"}
		</button>
	      </div>
	    </div>
	  </div>
	</div>
      </div>
    </div>
  )
}


export default NoteDetailPage
