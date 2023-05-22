import './mainpage.css'
import './ab.jpg'
import './dc.jpg'
import img2 from "./dc.jpg"
import img3 from "./pp.jpg"
import img4 from "./kk.jpg"
import img8 from "./boy.jpg"
import img9 from "./girl.jpg"

function HomePage() {
    
    return (
        <>
    <div className='homePage'>
    <div class="site">
        <h1 class="title">Digitalized birth registration system and Vaccination management for Pakistan</h1>
        <div class="buttonMP">  
            <a className='space' href="/login">SIGNIN</a>
        </div>


        </div>
       

        
       
        
    <section class="things">
         <h1>Things We Offer</h1>
        
    
    <div class="t">
        <div class="things-c">
            <h3>Streamlined and Efficient Process</h3>
            <p>A digitalized birth registration system and vaccination management for Pakistan would offer a streamlined and efficient process for recording and managing births and vaccination data. It would eliminate the need for manual paperwork and reduce the chances of errors or data duplication. The system could provide an online platform or mobile application where parents or guardians can easily register the birth of their child and schedule vaccinations. This would simplify the overall process and ensure accurate and up-to-date records.</p>
        </div>


        <div class="things-c">
            <h3>Centralized Database</h3>
            <p>The system would establish a centralized database for birth registration and vaccination management, consolidating all relevant information in one secure location. This database would contain comprehensive details about births, including vital information such as names, dates, and locations, as well as the vaccination history of each individual. Having a centralized database would enable efficient tracking and monitoring of vaccination coverage across the country, facilitating targeted interventions and ensuring timely immunization for every child.</p>
        </div>


        <div class="things-c">
            <h3>Real-time Reporting and Analysis</h3>
            <p> With a digitalized system, real-time reporting and analysis of birth registration and vaccination data would be possible. This would allow health authorities and policymakers to generate accurate and timely reports on birth rates, vaccination coverage, and trends. Such information is invaluable for assessing the effectiveness of vaccination campaigns, identifying areas with low coverage, and devising targeted strategies to improve immunization rates. Real-time reporting and analysis would enhance decision-making and enable the implementation of evidence-based policies to protect public health.</p>
        </div>
    </div>
</section>







<section class="doctor">
    <h1>Our     Faculty</h1>
   
       <div class="t">
        <div class="doctor-d">
            <img src={img2}/>
            <div class="layer">
                <h3>I'M Vaccine Manager ALISA</h3>
            </div>
        </div>



        <div class="doctor-d">
            <img src={img3}/>
            <div class="layer">
                <h3>I'M MSI Rose</h3>
            </div>
        </div>




        <div class="doctor-d">
            <img src={img4}/>
            <div class="layer">
                <h3>I'M Director EPI Alison</h3>
            </div>
        </div>
       </div>
</section>










<section class="test">
    <h1>What Our Patient Says</h1>
    <p>We love that our patients feel inspired to write about the care they received here at Mind Insight! Here are some of the wonderful letters and comments we have recently received.</p>
    <div class="t">
        <div class="test-col">
            <img src={img8}/>
            <div>
                <p>“My Sessions are always good.”</p>
                <h3>HARRY BROOK</h3>
                
            </div>
        </div>
        <div class="test-col">
            <img src={img9}/>
            <div>
                <p>“I was very satisfied with everything.”</p>
                <h3>ALEXA</h3>
            </div>
        </div>
    </div>
</section>


<section class="cta">
    <h1>Hospital Helps Save Lives</h1>
    <a href="" class="hero-btn">CONTACT US</a>
</section>




<section class="footer">
    <h4>ABOUT US</h4>
    <p>
    We are a leading provider of digital solutions for birth registration and vaccination management in Pakistan. Our goal is to modernize and streamline the processes involved, ensuring accurate records and timely immunizations for every child in the country.

With our user-friendly online platform, parents can easily register their child's birth, providing essential information with ease. We also offer a convenient appointment scheduling feature, allowing parents to schedule vaccinations at their nearest healthcare facilities.
    </p>
</section>

</div>
        </>
    )
   

}

export default HomePage;