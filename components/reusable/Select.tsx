import React, { useEffect, useState } from 'react'
import { Combobox } from '@headlessui/react'

const people = [
    'Durward Reynolds',
    'Kenton Towne',
    'Therese Wunsch',
    'Benedict Kessler',
    'Katelyn Rohan',
  ]

const Select = () => {
    const [selectedPerson, setSelectedPerson] = useState<Array<String>>([])
    const [query, setQuery] = useState('')
  
    const filteredPeople =
      query === ''
        ? people
        : people.filter((person) => {
            return person.toLowerCase().includes(query.toLowerCase())
          })

    useEffect(() => {
        console.log(selectedPerson)
    }, [selectedPerson])
  
    return (
      <Combobox value={selectedPerson[0]}>
        <Combobox.Input onChange={(event) => setQuery(event.target.value)} className="py-2 bg-black border-2 rounded-md border-gray-300"/>
        <Combobox.Options>
          {query !== '' && filteredPeople.map((person: any) => (
            <Combobox.Option key={person} value={person} className="cursor-pointer" onClick={() => {
                const updated = selectedPerson;
                updated.push(person);
                setSelectedPerson(updated)
                console.log(updated)
            }}>
              {person}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    )
}

export default Select
