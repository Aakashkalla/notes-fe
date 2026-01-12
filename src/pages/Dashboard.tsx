import { useNavigate } from "react-router-dom"
import api from "../lib/axios";
import { useEffect, useRef, useState } from "react";

type Note = {
    _id : string,
    title : string,
    content : string
}

const Dashboard = () => {
    const navigate = useNavigate();
    const[notes, setNotes] = useState<Note[]>([]);
    const[loading,setLoading] = useState(false);
    const[error, setError] = useState<string | null>(null);
    const titleRef = useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLInputElement>(null);

    async function logout(){
        await api.post('/auth/logout')
        navigate('/login')
    }

    async function addNote(){
        const title = titleRef.current?.value;
        const content = contentRef.current?.value;
        
        if(!title || !content){
            setError("Title and content are required")
            return;
        }

        setError(null);
        setLoading(true);

        try{
                const response = await api.post('/notes', {
                title,
                content
            })
            setNotes((prev)=>[...prev, response.data.note]);
        }
        catch(e){
            setError("Failed to add Note");
        }finally{
            setLoading(false);
        }
    }

    async function deleteNote(noteId : string){
        setError(null);
        setLoading(true);

        try{
            await api.delete(`/notes/${noteId}`)
            setNotes((prev)=>prev.filter((note)=>note._id!==noteId));
        }catch(e){
            setError("Failed to delete Note")
        }finally{
            setLoading(false);
        }   
    }

    useEffect(()=>{
        const fetchNotes = async () =>{
            setLoading(true);
            try{
                const response = await api.get('/notes');
                setNotes(response.data.notes)
            }catch(e){
                setError("Error! Failed to Load Notes")
            }finally{
                setLoading(false)
            }
        }
        fetchNotes();
    },[])

    return (
        <div>
            <h1>Notes</h1>
            <button onClick={()=>logout()}>Logout</button>
            {loading && <h1>Loading Notes...</h1>}
            {error && <p>{error}</p>}
            {!loading && notes.length===0 && <h1>No Notes! Add Some</h1>}
            {notes.map((note) => (
                <div key={note._id}>
                    <h3>{note.title}</h3>
                    <h3>{note.content}</h3>
                    <button onClick={()=>deleteNote(note._id)} disabled={loading}>
                        Delete
                    </button>
                </div>
            ))}

            <h1>Add Notes</h1>
            <label>Add Title</label>
            <input ref={titleRef} type="text" placeholder="Title"/>
            <label>Add Content</label>
            <input ref={contentRef} type="text" placeholder="Content"/>
            <button onClick={()=>addNote()} >Add Note</button>
        </div>
    )
}

export default Dashboard
