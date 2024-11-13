import { useEffect, useState } from 'react';
import { db, getCities, updateDoc } from '../firebase';
import { doc, deleteDoc } from 'firebase/firestore/lite';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase';
import { addDoc, collection } from "firebase/firestore/lite";

function App() {
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    desc: '',
    color: '',
    image: null,
    order: 0
  });
  const [insertionMode, setInsertionMode] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    desc: '',
    color: 'whitesmoke',
    image: null,
    order: 0,
  });

  useEffect(() => {
    getCities(db).then(setNotes);
  }, []);

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditForm({
      title: item.title,
      desc: item.desc,
      color: item.color,
      order: item.order,
      image: null
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({
      title: '',
      desc: '',
      color: '',
      image: null,
      order: 0
    });
  };

  async function uploadFile(id) {
    if (!editForm.image) return null;

    const imageRef = storageRef(storage, `Project Images/${id}/img`);
    const snapshot = await uploadBytes(imageRef, editForm.image);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  }

  async function handleUpdate() {
    try {
      const imageUrl = await uploadFile(editingId);
      const docRef = doc(db, 'MyProjects', editingId);
      
      const updateData = {
        title: editForm.title,
        desc: editForm.desc,
        color: editForm.color,
        order: editForm.order
      };

      if (imageUrl) {
        updateData.image = imageUrl;
      }

      await updateDoc(docRef, updateData);

      // Update local state
      setNotes(notes.map(note => 
        note.id === editingId 
          ? { ...note, ...updateData } 
          : note
      ));

      // Exit edit mode
      setEditingId(null);
    } catch (error) {
      console.error('Error updating document:', error);
      alert('Failed to update');
    }
  }

  async function handleDelete(id) {
    await deleteDoc(doc(db, 'MyProjects', id));
    setNotes(notes.filter(note => note.id !== id));
  }

  async function handleOrderChange(item, direction) {
    const docRef = doc(db, 'MyProjects', item.id);
    const newOrder = direction === 'up' ? item.order - 1 : item.order + 1;
    await updateDoc(docRef, { order: newOrder });
    
    // Update local state instead of refreshing
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === item.id 
          ? { ...note, order: newOrder }
          : note
      )
    );
  }

  const handleInsertClick = () => {
    setInsertionMode(true);  // Enable insertion mode
  };

  const handleCancelInsert = () => {
    setInsertionMode(false);  // Cancel insertion mode
    setNewNote({
      title: '',
      desc: '',
      color: 'whitesmoke',
      image: null,
      order: 0,
    });
  };

  async function handleUploadAndInsert() {
    if (newNote.image == null) {
      alert('Image cannot be empty');
      return;
    }
    
    try {
      // Create a new document in the database
      const docRef = await addDoc(collection(db, 'MyProjects'), {
        title: newNote.title,
        desc: newNote.desc,
        color: newNote.color,
        image: '',
        order: 0,
      });

      const id = docRef.id;

      // Upload the image
      const imageUrl = await uploadFile(id);

      // Update the new document with the image URL
      await updateDoc(docRef, {
        image: imageUrl,
      });

      // Add the new note to the local state
      setNotes([{ ...newNote, id, image: imageUrl }, ...notes]);

      // Exit insertion mode
      handleCancelInsert();
      alert('Insert Success');
    } catch (error) {
      console.error('Error inserting document:', error.message);
    }
  }

  return (
    <div className="font-sans relative">
      {/* Dark overlay, but the content remains interactable */}
      {/* { (editingId || insertionMode) && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-10 pointer-events-none" />
      )} */}
      
      <div className="px-20 py-16 relative z-20">
        <h1 className="animate-bounce text-6xl mb-6">
          Wilmer's <br />
          Journey of Life
        </h1>
        <p className='animate-pulse'>Not only coding, but anything in general</p>
        <button 
          onClick={handleInsertClick} 
          className="animate-spin bg-gray-200 w-20 h-20 rounded-full no-underline text-3xl text-center"
        >
          <p className='pb-2'>+</p>
        </button>
      </div>

      <hr className="border-gray-200" />

      <div className="relative z-20">
        {insertionMode && (
          <div className={`flex p-8 z-30 h-1/2`}>
            <div className="w-1/2 pl-36">
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setNewNote({...newNote, image: e.target.files[0]})} 
                className="mb-4"
              />
              <img 
                src={newNote.image ? URL.createObjectURL(newNote.image) : ''}
                alt="Preview" 
                className="h-52 rounded-lg outline outline-gray-200"
              />
            </div>
            <div className="w-1/2 pr-32">
              <input 
                value={newNote.title} 
                onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                className="text-2xl font-bold mb-2 w-full bg-transparent border rounded px-2 py-1"
                placeholder="Enter Title Here"
              />
              <textarea 
                value={newNote.desc}
                onChange={(e) => setNewNote({...newNote, desc: e.target.value})}
                className="w-full p-2 border rounded mb-4 resize-none"
                placeholder="Enter Description Here"
              />
              <input 
                value={newNote.color}
                onChange={(e) => setNewNote({...newNote, color: e.target.value})}
                className="w-full p-2 border rounded mb-4"
                placeholder="Enter Background Color"
              />
              <div className="flex space-x-2">
                <button 
                  onClick={handleUploadAndInsert} 
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Submit
                </button>
                <button 
                  onClick={handleCancelInsert} 
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}


        {notes.sort((a, b) => a.order - b.order).map((item) => (
          <div key={item.id} className={`relative ${editingId === item.id ? 'z-30' : 'z-20'}`}>
            <div className={`flex p-8 h-52 ${editingId === item.id ? 'ring-8 ring-blue-500' : ''}`}
                 style={{ backgroundColor: editingId === item.id ? editForm.color : item.color }}>
              <div className="w-1/2 pl-36">
                <img
                  src={item.image || 'default-image-url.png'}
                  alt="Project"
                  className="h-52 rounded-lg outline outline-gray-200"
                />
                {editingId === item.id && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditForm({...editForm, image: e.target.files[0]})}
                    className="mt-4"
                  />
                )}
              </div>
              <div className="w-1/2 pr-32">
                {editingId === item.id ? (
                  <>
                    <input
                      value={editForm.title}
                      onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      className="text-2xl font-bold mb-2 w-full bg-transparent border rounded px-2 py-1"
                    />
                    <textarea
                      value={editForm.desc}
                      onChange={(e) => setEditForm({...editForm, desc: e.target.value})}
                      className="w-full p-2 border rounded mb-4 resize-none"
                    />
                    <input
                      value={editForm.color}
                      onChange={(e) => setEditForm({...editForm, color: e.target.value})}
                      className="w-full p-2 border rounded mb-4"
                      placeholder="Color (e.g. #ffffff)"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h1 className="animate-pulse text-2xl font-bold mb-2">{item.title}</h1>
                    <p className="mb-4">{item.desc}</p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => startEditing(item)}
                        className="transition ease-in-out hover:scale-125 duration-300 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <span className="mx-2">_</span>
                      <button
                        onClick={() => handleOrderChange(item, 'up')}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        ^
                      </button>
                      <button
                        onClick={() => handleOrderChange(item, 'down')}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        v
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <hr className="border-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
