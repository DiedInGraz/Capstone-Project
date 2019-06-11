<template>
<!-- 
  File: home_view.vue
  Author: KJ Smith
  Description: This file contains the contents for the homepage.
 -->
    <div>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <div class="bg-homepage">
            <div class="bg-grad-homepage">
                <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                    <!-- image carousel -->
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="home-carousel-img-1" src="../assets/slideshow/slide1.jpg" alt="First slide">
                        </div>
                        <div class="carousel-item">
                            <img class="home-carousel-img-2" src="../assets/slideshow/slide2.jpg" alt="Second slide">
                        </div>
                        <div class="carousel-item">
                            <img class="home-carousel-img-3" src="../assets/slideshow/slide3.jpg" alt="Third slide">
                        </div>
                        <!-- overlayed info box -->
                        <div class="content-homepage">
                            <header class="header-home-p1"> Baylor Capstone</header>
                            <div class="homepage-p2"/>
                            <p class="homepage-paragraph1">
                                Baylor's capstone program gives students of select programs
                                the opportunity to put what they have learned in the classroom
                                into practice in real-world applications alongside corporate
                                sponsors.
                            </p>
                        </div>
                        
                    </div>

                    <div class="homepage-btn-wrap">
                        <!-- if the user is already loggged in, navigate to the dashboard -->
                        <nuxt-link v-if="allowAccess===1" to="/dashboard/dashboard" style="text-decoration:none">
                            <button class="homepage-btns grow">
                                User's login
                            </button>
                        </nuxt-link>
                        <!-- if the user is NOT logged in, navigate to login page -->
                        <nuxt-link v-else to="/Authentication/login" style="text-decoration:none">
                            <button class="homepage-btns grow">
                                User's login
                            </button>
                        </nuxt-link>

                        <nuxt-link to="/About" style="text-decoration:none">
                            <button class="homepage-btns grow">
                                Learn More
                            </button>
                        </nuxt-link>
                    </div>

                    <!-- invisible scroll buttons for the carousel -->
                    <a class="carousel-control-prev" href="#carouselExampleSlidesOnly" role="button" data-slide="prev">
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleSlidesOnly" role="button" data-slide="next">
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                
            </div>
        </div>

        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        
        <!-- set the speed at which the carousel will cycle -->
        <script language="JavaScript" type="text/javascript">
                $('.carousel').carousel({
                    interval: 5000
                });
        </script>
    </div>
</template>


<script>
import authMixin from '@/mixins/allUsers.js'

export default{
    head() {
        /* set title for page */
        return{
            title: "BU | Home"
        }
    },
    mixins: [authMixin],

};
</script>