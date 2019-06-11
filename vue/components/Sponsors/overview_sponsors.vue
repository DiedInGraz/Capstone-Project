<!--
Author: Tim Lee
Page: overview_sponsors.vue
    Parent Page: Sponsors.vue

Contains an in-depth information guide about sponsorships.
This component uses an accordion template provided by bootstrap to make the information 
    displayed easier to read.
-->

<template>

    <div id="accordion">
        <div class="card bg-transparent">
            <div class="card-header" id="headingOne">
            <h5 class="mb-0">
                <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <h2 class="accordion-title-sponsors">Who Makes a Great Sponsor?</h2>
                </button>
            </h5>
            </div>

            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                <div class="card-body">
                    <p class="card-text-sponsors-accordion">Our most successful Sponsors provide both 
                        <b>time</b> and <b>mentorship</b>:
                        <ul><br>
                            <li><b>Time</b> - Sponsor involvement is crucial for the success 
                                of a Capstone project. It is highly recommended sponsors 
                                provide an individual who spends an hour a week to support 
                                the team.</li><br>
                            <li><b>Mentorship</b> - Sponsors offer mentorship to our 
                                students through consultations by challenging assumptions, 
                                offering insight into designs, and providing resources. 
                                </li>
                        </ul>
                    </p>
                </div>
            </div>
        </div>

        <div class="card bg-transparent">
            <div class="card-header" id="headingTwo">
            <h5 class="mb-0">
                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    <h2 class="accordion-title-sponsors">What Makes a Great Project for Sponsors to Give?</h2>
                </button>
            </h5>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                <div class="card-body">
                    <p class="card-text-sponsors-accordion">We are looking for projects with important key elements 
                        that offer the following for our students:
                        <ul><br>
                            <li>a broad enough scope to challenge a team of 5 students</li><br>
                            <li>a challenge to require students to apply their undergraduate 
                                course work</li><br>
                            <li>a challenge to motivate students to learn different types of 
                                technologies and design techniques for the project</li><br>
                            <li>a challenge to provide students with a realistic 
                                professional experience</li>
                        </ul>
                    </p>
                </div>
            </div>
        </div>

        <div class="card bg-transparent">
            <div class="card-header" id="headingThree">
            <h5 class="mb-0">
                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    <h2 class="accordion-title-sponsors">Important Dates</h2>
                </button>
            </h5>
            </div>
            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                <div class="card-body">
                    <p class="card-text-sponsors-accordion">The following are some important dates for the 
                        upcoming Capstone cycle at Baylor:
                        <ul class="sponsors-accordion-list-style"><br>
                            <li><b>December 31, 2018</b> - Deadline to submit project 
                                proposals for Spring 2019. Send proposals to 
                                <b>capstone@baylor.edu.</b></li><br>
                            <li><b>January 14, 2019</b> - Project Kickoff: Sponsor Project 
                                Introduction to Students at Cashion Academic Center, 
                                3:30pm to 6:30pm.</li><br>
                            <li><b>February 12, 2019</b> - Milestone 1: Progress Report and 
                                Potential Demonstration at Cashion Academic Center, 
                                3:30pm to 6:30pm.</li><br>
                            <li><b>March 26, 2019</b> - Milestone 2: Progress Report and 
                                Demonstration at Cashion Academic Center, 
                                3:30pm to 6:30pm.</li><br>
                            <li><b>April 30, 2019</b> - Final Presentations: Showcase</li>
                        </ul>
                    </p>
                </div>
            </div>
        </div>

        <div class="card bg-transparent">
            <div class="card-header" id="headingFour">
            <h5 class="mb-0">
                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    <h2 class="accordion-title-sponsors">Sponsorship Fees</h2>
                </button>
            </h5>
            </div>
            <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordion">
                <div class="card-body">
                    <p class="card-text-sponsors-accordion">Sponsors support Capstone Projects at Baylor 
                        through a sponsorship fee of <b>$4,000 per project</b>. About 
                        two-thirds of the fee directly goes to purchasing project materials. 
                        The remainder is used to finance facilities, community outreach, and 
                        personnel.
                        <br><br>
                        To inquire about reduced fees, please contact us at 
                        <b>capstone@baylor.edu</b> for more information.
            </p>
                </div>
            </div>
        </div>

        <div class="card bg-transparent">
            <div class="card-header" id="headingFive">
            <h5 class="mb-0">
                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                    <h2 class="accordion-title-sponsors">Benefits of Sponsoring a Capstone</h2>
                </button>
            </h5>
            </div>
            <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordion">
                <div class="card-body">
                    <p class="card-text-sponsors-accordion">Our current and past Capstone Sponsors have reported 
                        many benefits when working with our Capstone students, including:
                        <ul><br>
                            <li>Over 1,000 personnel hours dedicated to your 
                                project across 15 weeks.</li><br>
                            <li>Exposure of your company's brand across campus.</li><br>
                            <li>In-depth way to meet and engage with students before 
                                graduation.</li><br>
                            <li>Fresh minds striving to move your project forward.</li><br>
                            <li>Opportunities to mentor the next generation of students.</li>
                        </ul>
                    </p>
                </div>
            </div>
        </div>

        <div class="card bg-transparent">
            <div class="card-header" id="headingSix">
            <h5 class="mb-0">
                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                    <h2 class="accordion-title-sponsors">How to Become a Capstone Sponsor</h2>
                </button>
            </h5>
            </div>
            <div id="collapseSix" class="collapse" aria-labelledby="headingSix" data-parent="#accordion">
                <div class="card-body">
                    <p class="card-text-sponsors-accordion">We strive to make the Capstone Program at Baylor to 
                        be a positive experience for everyone involved. To set the 
                        expectations for both students and sponsors early, we ask that 
                        project sponsors provide the following:
                        <ul><br>
                            <li>Create a document that contains a brief overview of 
                                your envisioned project, along with a list of deliverables 
                                you expect as a result. 
                            </li><br>
                            <li>Send the document to <b>capstone@baylor.edu</b>. We will be
                                in contact with you shortly after receiving the document.</li><br>
                            <li>Attend the Project Kickoff session to explain the project and 
                                to meet with students as the project begins.
                            </li>
                        </ul>
                    </p>
                </div>
            </div>
        </div>

        <div class="card bg-transparent">
            <div class="card-header" id="headingSeven">
            <h5 class="mb-0">
                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                    <h2 class="accordion-title-sponsors">Questions?</h2>
                </button>
            </h5>
            </div>
            <div id="collapseSeven" class="collapse" aria-labelledby="headingSeven" data-parent="#accordion">
                <div class="card-body">
                    <p class="card-text-sponsors-accordion">If you would like to know more about the Capstone 
                        program at Baylor, or would like to request more information about 
                        Sponsorships, please reach out to us at 
                        <b>capstone@baylor.edu</b>. We look forward to hearing from you!
                    </p>
                </div>
            </div>
        </div>

    </div>

</template>


<script>

/* Empty, but needed because Vue compiler won't stop screaming. */
export default{

}

</script>
