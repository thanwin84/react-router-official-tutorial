import React from 'react'
import { 
    Form, 
    useLoaderData,
    useFetcher
 } from 'react-router-dom'
import { getContact, updateContact } from '../contact';

export async function loader({params}){
    const contact = await getContact(params.contactId)
    return {contact}
}

export async function action ({request, params}){
    let formData = await request.formData()
    return updateContact(params.contactId, {
        favorite: formData.get('favorite')=== 'true'}
    )
}

export default function Contact(){
    const {contact} = useLoaderData()
    // const contact = {
    //     first: "Your",
    //     last: "Name",
    //     avatar: "https://placekitten.com/g/200/200",
    //     twitter: "your_handle",
    //     notes: "Some notes",
    //     favorite: true,
    // };

    function handleDelete(e){
        if (
            !confirm("please confirm you want to delete this")
        )
        e.preventDefault()
    }
    return (
        <div className='flex p-4 my-auto shadow-md'>
            <div className='mr-4'>
                <img 
                    key = {contact.avatar}
                    src={contact.avatar || null} 
                    alt="some image" />
            </div>

            <div>
                <h1 className='flex  text-2xl font-medium '>
                    {
                        contact.first || contact.last ? (
                            <>
                                {contact.first} {contact.last}
                            </>
                        ) : (
                            <i>No name</i>
                        )
                    } {""}
                    <Favorite contact={contact} />
                </h1>

                {contact.twitter && (
                    <p className='my-2 text-blue-600'>
                        <a 
                            href={`https://twitter.com/${contact.twitter}`}
                        >
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div className='flex mt-6'>
                    <Form action='edit'>
                        <button 
                            className= "mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                            type='submit'
                        >
                            Edit
                        </button>
                    </Form>
                    <Form 
                        method='post'
                        action = "destroy"
                        onSubmit={handleDelete}
                    >
                        <button 
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                            type='submit'
                        >
                            Delete
                        </button>
                    </Form>
                </div>
                
            </div>
        </div>
    )
      

}

function Favorite({contact}){
    let favorite = contact.favorite

    const fetcher = useFetcher()
    if (fetcher.formData){
        favorite = fetcher.formData.get('favorite') === 'true'
    }
    return (
        // fetcher allows us to communicate with loaders and actions wihtout causing a navigation
        <fetcher.Form method="post">
            <button
                className='ml-2'
                name = 'favorite'
                value = {favorite ? "false": "true"}
                aria-label={
                    favorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
            >
                {favorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    )
}