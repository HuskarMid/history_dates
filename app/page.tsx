'use client'
import { useEffect, useState, useRef } from 'react';
import HistoryCompass from "./components/historyCompass";


const data = [
  {
    id: 1,
    year: '1981',
    title: 'Наука',
    dates: [
      {
        date: '1981', 
        description: '"Кто подставил кролика Роджера?"/Who framed Roger Rabbit?, США (реж. Роберт Земекис)',
      },
      {
        date: '1982', 
        description: '"Назад в будущее 2"/Back to the Future Part II, США (реж. Роберт Земекис)',
      },
      {
        date: '1983', 
        description: '"Миллионы долларов в час"/The Million Dollar Man, США (реж. Джон Г. Адамс)',
      },
      {
        date: '1984', 
        description: '"Стражи Галактики"/Guardians of the Galaxy, США (реж. Джеймс Ганн)',
      },
      {
        date: '1985', 
        description: '"Стражи Галактики"/Guardians of the Galaxy, США (реж. Джеймс Ганн)',
      },
      {
        date: '1986', 
        description: '"Стражи Галактики"/Guardians of the Galaxy, США (реж. Джеймс Ганн)',
      }

    ]

  },
  {
    id: 2,
    year: '1987',
    title: 'История',
    dates: [
      {
        date: '1987', 
        description: '"Хищник"/Predator, США (реж. Джон МакТирнан)',
      },
      {
        date: '1988', 
        description: '"Кто подставил кролика Роджера?"/Who framed Roger Rabbit?, США (реж. Роберт Земекис)',
      },
      {
        date: '1989', 
        description: '"Назад в будущее 2"/Back to the Future Part II, США (реж. Роберт Земекис)',
      },
      {
        date: '1990', 
        description: '"Миллионы долларов в час"/The Million Dollar Man, США (реж. Джон Г. Адамс)',
      },
      {
        date: '1991', 
        description: '"Стражи Галактики"/Guardians of the Galaxy, США (реж. Джеймс Ганн)',
      },
      {
        date: '1992', 
        description: '"Стражи Галактики"/Guardians of the Galaxy, США (реж. Джеймс Ганн)',
      }
    ]
  },
  {
    id: 3,
    year: '1993',
    title: 'Спорт',
    dates: [
      {
        date: '1993', 
        description: '"Кто подставил кролика Роджера?"/Who framed Roger Rabbit?, США (реж. Роберт Земекис)',
      },
      {
        date: '1994', 
        description: '"Назад в будущее 2"/Back to the Future Part II, США (реж. Роберт Земекис)',
      },
      {
        date: '1995', 
        description: '"Миллионы долларов в час"/The Million Dollar Man, США (реж. Джон Г. Адамс)',
      },
      {
        date: '1996', 
        description: '"Стражи Галактики"/Guardians of the Galaxy, США (реж. Джеймс Ганн)',
      },
      {
        date: '1997', 
        description: '"Стражи Галактики"/Guardians of the Galaxy, США (реж. Джеймс Ганн)',
      },
      {
        date: '1998', 
        description: '"Стражи Галактики"/Guardians of the Galaxy, США (реж. Джеймс Ганн)',
      }

    ]
  },
  {
    id: 4,
    year: '1999',
    title: '',
    dates: [
      {
        date: '1999', 
        description: '"Хищник"/Predator, США (реж. Джон МакТирнан)',
      },
      {
        date: '2000', 
        description: '"Кто подставил кролика Роджера?"/Who framed Roger Rabbit?, США (реж. Роберт Земекис)',
      },
      {
        date: '2001', 
        description: '"Назад в будущее 2"/Back to the Future Part II, США (реж. Роберт Земекис)',
      },
      {
        date: '2002', 
        description: '"Миллионы долларов в час"/The Million Dollar Man, США (реж. Джон Г. Адамс)',
      },
      {
        date: '2003', 
        description: '"Стражи Галактики"/Guardians of the Galaxy, США (реж. Джеймс Ганн)',
      },
      {
        date: '2004', 
        description: '"Стражи Галактики"/Guardians of the Galaxy, США (реж. Джеймс Ганн)',
      }

    ]
  },
  {
    id: 5,
    year: '2005',
    dates: [
      {
        date: '2005', 
        description: '"Хищник"/Predator, США (реж. Джон МакТирнан)',
      },
      {
        date: '2006', 
        description: '"Кто подставил кролика Роджера?"/Who framed Roger Rabbit?, США (реж. Роберт Земекис)',
      },
      {
        date: '2007', 
        description: '"Назад в будущее 2"/Back to the Future Part II, США (реж. Роберт Земекис)',
      },
      {
        date: '2008', 
        description: '"Миллионы долларов в час"/The Million Dollar Man, США (реж. Джон Г. Адамс)',
      },
      {
        date: '2009', 
        description: '"Стражи Галактики"/Guardians of the Galaxy, США (реж. Джеймс Ганн)',
      },
      {
        date: '2010', 
        description: '"Стражи Галактики"/Guardians of the Galaxy, США (реж. Джеймс Ганн)',
      }
    ]
  },
  {
    id: 6,
    year: '2011',
    title: 'Технологии',
    dates: [
      {
        date: '2011', 
        description: '"Хищник"/Predator, США (реж. Джон МакТирнан)',
      },
      {
        date: '2012', 
        description: '"Кто подставил кролика Роджера?"/Who framed Roger Rabbit?, США (реж. Роберт Земекис)',
      },
      {
        date: '2013', 
        description: '"Назад в будущее 2"/Back to the Future Part II, США (реж. Роберт Земекис)',
      },
      {
        date: '2014', 
        description: '"Миллионы долларов в час"/The Million Dollar Man, США (реж. Джон Г. Адамс)',
      },
      {
        date: '2015', 
        description: '"Стражи Галактики"/Guardians of the Galaxy, США (реж. Джеймс Ганн)',
      },
      {
        date: '2016', 
        description: '"Стражи Галактики"/Guardians of the Galaxy, США (реж. Джеймс Ганн)',
      }

    ]
  },
]

export default function Home() {

  // Для работы компонента нужно передать ему ширину родительского контейнера (padding не будет включаться в ширину)
  const [parentWidth, setParentWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setParentWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  // ---

  return (
    <div ref={containerRef} className="parent-container" style={{width: 'calc(100% - 150px)', height: '100%', float: 'right'}}>
      <HistoryCompass $data={data} $parentWidth={parentWidth} />
    </div>
  )
}
