import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Durumlar from 'src/components/Depocu/Durumlar'
import { fetchDepodakiKargolar, SelectDepodakiKargolar } from 'src/redux/depocu/depocuSlice'

function Dashboard() {
  const dispatch = useDispatch()
  const depodakiKargolar = useSelector(SelectDepodakiKargolar)
  const navigate = useNavigate()

  React.useEffect(() => {
    dispatch(fetchDepodakiKargolar())
  }, [])
  const data = [
    {
      className: 'mb-4',
      color: 'info',
      value: (item) => (
        <div onClick={() => navigate('/depocu/depodaki-paketler')}>
          <div className="h-16 text-xl">Depodaki Kargolar ({depodakiKargolar.length})</div>
          <button>
            <span className="text-xl">{item.linkTitle}</span>
          </button>
        </div>
      ),
      sm: 12,
      lg: 12,
      title: 'Users',
      link: '#',
      linkTitle: 'Kargoları Getir',
    },
  ]
  return <Durumlar data={data} />
}

export default Dashboard
