import React, {useState, useEffect} from "react";
import { 
    Outlet, 
    useLoaderData,
    Form,
    redirect,
    NavLink,
    useNavigation,
    useSubmit
} from "react-router-dom";
import { createContact, getContacts } from "../contact";
import { SearchSpinner } from "../utils";


export async function loader({request}){
    const url = new URL(request.url)
    const q = url.searchParams.get("q") || ""
    const contacts = await getContacts(q)
    return {contacts, q}
}

export async function action(){
    const contact = await createContact()
    return redirect(`/contacts/${contact.id}/edit`)
}

export default function Root(){
    const {contacts, q} = useLoaderData()
    const navigation = useNavigation()
    const [query, setQuery] = useState(q)
    // here, it will be used to submit formdata on every key stroke
    const submit = useSubmit()


    useEffect(()=>{
        setQuery(q)
    }, [q])

    const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q')
    
    const activeLinkStyle = "px-2 py-1 bg-blue-500 text-white mb-2 rounded block"
    return (
        <div className="flex h-screen">
            <section className=" p-4   border-r border-gray-400 bg-slate-100">
            <h1 className="text-2xl font-medium mb-3">React Router Contacts</h1>
            <div>
                <div className="flex mb-4">
                    <form role='search' className="relative">
                        {searching && <SearchSpinner/>}
                        <input
                            className="py-1 px-2 pl-8 mr-2 focus:outline-none border border-gray-400 rounded shadow-md"
                            placeholder="search"
                            type="search"
                            name ="q"
                            value = {query}
                            onChange = {(e)=>submit(e.currentTarget.form, {replace: true})}
                            autoComplete="off"
                            
                        />
                        
                    </form>
                    <Form method='post'>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline" 
                            type='submit'
                        >
                            New
                        </button>
                    </Form>
                </div>
                <nav>
                   {
                    contacts.length ? (
                        <ul className="">
                            {/* list of contact */}
                            {contacts.map(contact =>{
                                return (
                                    <li 
                                        className='mb-2 w-full' 
                                        key={contact.id}
                                    >
                                        <NavLink 
                                            className={({isActive})=> isActive ? activeLinkStyle : null}
                                            to={`contacts/${contact.id}`}
                                        >
                                            {contact.first || contact.last ?(
                                                <>{contact.first} {contact.last}</>
                                            ): (
                                                <i>No name</i>
                                            )}
                                        </NavLink>
                                    </li>
                                )
                            })}
                        </ul>
                    ) :
                    <p>No contact</p>
                   }
                </nav>
            </div>
        </section>
        <section 
            className={navigation.state === 'loading' ? `p-3 transition-opacity duration-300 ease-in-out opacity-80 hover:opacity-100`: "p-3"}
        >
            <Outlet/>
        </section>
    </div>
    )
}
