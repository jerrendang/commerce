import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import { createItem, getItem } from '../../store/item';
import Loading from '../Loading';
import ItemTile from '../ItemTile';
import { fetcher } from '../../store/fetch';

const homeCategories = ["Listed", "Sold"]

const Home = ({isLoaded}) => {
    const [homeFetching, setHomeFetching] = useState(true);
    const {user} = useSelector(state => state.session);
    const [homeCategory, setHomeCategory] = useState(0);
    const [uploadedFile, setFile] = useState(null);
    const [itemPhotoName, setPhotoName] = useState('');
    const navigate = useNavigate();

    const [homeItems, setHomeItems] = useState([]);
    const [newItem, setNewItem] = useState({});

    // set photo key and file contents on input change ////////////////////////////////////////////////////////

    const handleCreateItem = (e) => {
        e.preventDefault();
        const item = {
            userID:user.id,
            price: newItem.price,
            name: newItem.name,
            description: newItem.description,
            category: newItem.category,
            binary: uploadedFile,
            key: itemPhotoName
        }
        createItem(item);
        e.target.reset();
        setNewItem({});
    }

    const handleUpload = (e) => {
        if (e.target.files){
            const reader = new FileReader();
            reader.onload = (e) => {
                setFile(e.target.result);
            }
            setPhotoName(e.target.files[0].name);
            reader.readAsArrayBuffer(e.target.files[0])
        }
    }

    const handleNewItemInput = (e, field) => {
        setNewItem({
            ...newItem,
            [field]: e.target.value
        })
    }

    const fetchHomeItems = async () => {
        const res = await fetcher(`/api/item?user_id=${user.id}&sold=${homeCategories[homeCategory] === 'Sold'}`, {
            method: 'GET'
        })
        const {items} = await res.json();
        setHomeItems(items)
    }

    useEffect(() => {
        if (isLoaded) {
            if (JSON.stringify(user) === '{}') {
                navigate('/')
            }
            else if (!user.verified) {
                navigate('/verify')
            }
        }
    }, [isLoaded, user, navigate])

    // fetching either sold or listed items
    useEffect(() => {
        if (isLoaded && JSON.stringify(user) !== '{}'){
            setHomeFetching(true);
            fetchHomeItems()
                .then(() => setHomeFetching(false))
        }
    }, [homeCategory])

    useEffect(() => {
        if (isLoaded && JSON.stringify(user) !== '{}'){
            fetchHomeItems()
        }
    }, [user, isLoaded, homeCategory])

    return (
    <div className='h-[100vh] w-auto flex flex-col items-center justify-start'>
        {/* selection bar */}
        <div className='flex flex-row'>
            {
                homeCategories.map((category, idx) => (
                    <span key={idx}>
                        <label className={`hover:cursor-pointer ${homeCategory == idx ? 'bg-[red]': ''}`}
                        htmlFor={category}>{category}</label>
                        <button id={category} className='hidden' onClick={(e) => setHomeCategory(idx)}></button>
                    </span>
                ))
            }
        </div> 

        <form className='flex flex-col' onSubmit={handleCreateItem}>
            <span>
                <label>Name:</label>
                <input type='text' onChange={(e) => handleNewItemInput(e, 'name')}/>
            </span>
            <span>
                <label>Description:</label>
                <input type='text' onChange={(e) => handleNewItemInput(e, 'description')} />
            </span>
            <span>
                <label>Price:</label>
                <input type='number' onChange={(e) => handleNewItemInput(e, 'price')} />
            </span>
            <span>
                <label>Quantity</label>
                <input type='number' onChange={(e) => handleNewItemInput(e, 'quantity')} />
            </span>
            <span>
                Category here
            </span>
            <span>
                <input type='file' accept='image/png, image/jpeg' onChange={handleUpload} />
            </span>
            <button type='submit'>Create item</button>
        </form>

        {/* items */}
        <div>
            {
                homeFetching && (
                    <Loading size='42'/>
                )
            }
            {
                !homeFetching && (
                    <div className='flex flex-row flex-wrap'>
                        {
                            homeItems.map((item, idx) => (
                                <div key={idx}>
                                    <ItemTile item={item} />
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    </div>
    )
};

export default Home;
