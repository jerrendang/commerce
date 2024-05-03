import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Loading from "../Loading";
import { getExploreItems } from "../../store/item";
import categories from '../../assets/clothing_categories.json'
import ItemTile from "../ItemTile";

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
    <div>
      {/* selection bar */}
      <div className='flex flex-row'>
        {
          exploreCategories.map((category, idx) => {
            return (
              <span key={idx} 
              className={`${selectedCategory === category ? 'bg-[red]': ''} hover: cursor-pointer mx-[1em]`}>
                <span onClick={e => setSelectedCategory(exploreCategories[idx])}>{category}</span>
              </span>
            )
          })
        }
      </div>

      {/* items */}
      <div>
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
