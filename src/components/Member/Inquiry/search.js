import React, {useState, useRef, useEffect} from "react";

export const useSearch = () => {

    const [form, setForm] = useState({
        status: 'All', search: '', levels: [false, false, false, false], merchant: false
    })

    const changeHandler = event => { // считывает из формы
        
        setForm( form => ({...form, [event.target.name]: event.target.value}) )

        console.log('Data', form); // здесь данные есть
    }

    const searchHandler = async () => { // вызывается кнопкой
    
        const responce = await fetch('http://localhost:80/admin/getUsersList', {
          method: 'POST',  body: {...form} // в этой форме пусто
        })
        const data = await responce.json()
        console.log('Data', data);
    }

    const checkboxHandler = (index) => {
        let tmp = form.levels
        tmp[index] = !tmp[index]
        setForm({ ...form, levels: tmp})
    }

    

    return {checkboxHandler, changeHandler, searchHandler, test}
}

