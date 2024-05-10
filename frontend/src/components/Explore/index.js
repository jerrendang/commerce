import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Loading from "../Loading";
import { getExploreItems } from "../../store/item";
import categories from '../../assets/clothing_categories.json'
import ItemTile from "../ItemTile";

import './Explore.css';

const {exploreCategories} = categories;

const Explore = ({isLoaded}) => {
  const [exploreItems, setExploreItems] = useState([]);
  const [exploreLoading, setExploreLoading] = useState(true);
  const [explorePage, setExplorePage] = useState(1);
  const exploreCount = 20;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  const {user} = useSelector(state => state.session);
  // fetch and query by popularity score

  const handleNextPage = (e) => {
    setExplorePage(explorePage + 1)
  }

  const handleBackPage = (e) => {
    setExplorePage(explorePage - 1)
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

  useEffect(() => { // change page and count to programmatic
    if (JSON.stringify(user) !== '{}'){
      getExploreItems(selectedCategory, exploreCount, explorePage, user.id)
        .then((data) => setExploreItems(data.items))
        .then(() => setExploreLoading(false))
    }
  }, [user, selectedCategory, explorePage])

  if (exploreLoading){
    return <Loading />
  }

  return (
    <div className='w-[100%] relative flex flex-col items-center'>
      {/* selection bar */}
      <div className='flex flex-row my-[1em] h-[2.2em] w-auto'>
        {
          exploreCategories.map((category, idx) => {
            return (
              <span key={idx} 
              className={`${selectedCategory === category ? 'selectedCategory': 'notSelected'} hover:cursor-pointer mx-[1em] py-[.25em] px-[1em]`}
              onClick={e => setSelectedCategory(exploreCategories[idx])}>
                <span >{category}</span>
              </span>
            )
          })
        }
      </div>

      {/* items */}
      <div className='p-[1em] flex flex-row flex-wrap items-start w-[100%]'>
        {
          exploreItems.length <= 0 && (
            <div className='text-[black]'>No items yet.</div>
          )
        }
        {
          exploreItems.map((item, idx) => {
            return (
              <div key={idx}>
                <ItemTile item={item}/>
              </div>
            )
          })
        }
      </div>
      <div>
        {
          exploreItems.length >= exploreCount && (
            <div>
              <span classname={`hover:cursor-pointer`}
              onClick={handleNextPage}>next</span>
            </div>
          )
        }
        {
          explorePage > 1 && (
            <div>
              <span className={`hover:cursor-pointer`} 
              onClick={handleBackPage}>back</span>
            </div>
          )
        }
      </div>
    </div>
  )
};

export default Explore;
