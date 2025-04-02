import BarChart from "./components/BarChart"


const Home = () => {
    
    return (
        
        <div>
            <BarChart 
                title={'三大框架满意度'}
                xData={['Vue', 'Angular', 'react']}
            />
            <BarChart 
                title={'三大语言使用情况'}
                xData={['Java', 'C++', 'Python']}
            />
        </div>
    )
}

export default Home