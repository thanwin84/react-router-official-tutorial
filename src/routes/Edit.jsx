import { 
  Form, 
  useLoaderData, 
  redirect,
  useNavigate
 } from "react-router-dom";
import { updateContact } from "../contact";

export async function action({request, params}){
    const formData = await request.formData()
    const updates = Object.fromEntries(formData)
    await updateContact(params.contactId, updates)
    return redirect(`/contacts/${params.contactId}`)
}

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate()

  return (
    <Form method="post" className="p-4">
      <p className="mb-4">
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
          className="block w-full border border-gray-300 rounded p-2 mt-1"
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
          className="block w-full border border-gray-300 rounded p-2 mt-1"
        />
      </p>
      <label className="mb-4 block w-full">
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
          className="w-full border border-gray-300 rounded p-2 mt-1"
        />
      </label>
      <label className="mb-4 block w-full">
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
          className="w-full border border-gray-300 rounded p-2 mt-1"
        />
      </label>
      <label className="mb-4 block w-full">
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={6}
          className="w-full border border-gray-300 rounded p-2 mt-1"
        />
      </label>
      <p className="mb-4">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
          Save
        </button>
        <button 
          onClick={()=> navigate(-1)}
          type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
