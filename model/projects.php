<?php
class Projects_Model extends WOA {

   function __construct() { parent::__construct(); }

   public function get_user_projects()
   {
      $db = new DB();
      $all_projects = array();

      $projects = $db->select_from(array('*'), 'projects');
      foreach ($projects as $project)
      {
         // Return Project ONLY if User has Access
         $access = $db->select_from_where_and(array('access'), 'project_users', 'user_id', $_SESSION['user']['user_id'], 'proj_id', $project['id']);
         if (count($access) != 0)
         {
            $access = $access[0]['access'];

            $project['template'] = 'projects-list-items';
            $user_count = $db->select_from_where(array('count(*)'), 'project_users', 'proj_id', $project['id']);
            $project['user_count'] = $user_count[0]['count(*)'];
            $project['sub_nav'] = array();

            // Fetch from DB
            $project['overview'] = array(
               'description' => 'Now, without further ado, Get Ready India! April 2014 our vision of promoting “Above the influence” centered principles of living a truly P.L.U.R (Peace, Love, Unity, Respect) lifestyle along with the love for Electronic Dance Music will manifest! NAME OF EVENT will set a Benchmark for events to follow. The Festival will further propel our stance that electronic shows are much more than they appear to third persons. The venue hosting this years Gala event will be a safe haven to those who remain open minded, where those who attend can learn and experience two incredible cultures, different in so many ways, yet able to coexist so beautifully. Thus, it is our goal to ultimately found a completely new culture encompassing the new with the old.',
               'details' => $project['user_count'] . ' users can see this project.'
            );

             $project['biz_plan'] = array(
                 array(
                     'first' => true,
                     'section' => 'History',
                     'articles' => array(
                         array(
                             'article' => 'Anarchy Productions International LLC',
                             'body' => '<p>In August of 2008 World of Anarchy made their debut with one of the most memorable events of the year: “Down The Rabbit Hole 2” (DTRH 2). What started off as a small idea for a fun electronic music concert consisting of 1 stage and 200 attendees, grew rapidly to an Alice in Wonderland themed 3 stage, 16 hour, 3000 person festival.  It left those that attended in sheer awe! Those who were in attendance along with the multitude of very talented artists, still enthusiastically rave about the event till this day! In early 2010 plans for the “Return of the Mad Hatter: Down the Rabbit Hole 3” were being hatched. In August of 2011 we brought that vision to life at the Monterey County Fair Grounds. DTRH 3 had the same Alice in wonderland theme, only on a much larger scale; with 4 Massive stages, On-site Camping, over 70 renowned DJ’s flown in from all over the world, and 36 Hours of non-stop music. To make this a truly original and out of this world experience, we decided to have On-site Tattoo Artists, Body painting, Glass Blowing, Kandi and Craft workshops, as well as our own hookah lounge, providing maximum entertainment for our guests. With over 15,000 attendees, we are very proud to say DTRH 3 was a huge success!</p>'
                         ),
                         array(
                             'article' => 'Event Overview',
                             'body' => '<p>Now, without further ado, Get Ready India! April 2014 our vision of promoting “Above the influence” centered principles of living a truly P.L.U.R (Peace, Love, Unity, Respect) lifestyle along with the love for Electronic Dance Music will manifest! NAME OF EVENT will set a Benchmark for events to follow. The Festival will further propel our stance that electronic shows are much more than they appear to third persons. The venue hosting this years Gala event will be a safe haven to those who remain open minded, where those who attend can learn and experience two incredible cultures, different in so many ways, yet able to coexist so beautifully. Thus, it is our goal to ultimately found a completely new culture encompassing the new with the old.</p>'
                         )
                     )
                 ),
                 array(
                     'section' => 'Event Logistics',
                     'articles' => array(
                         array(
                             'article' => 'Date & Time',
                             'body' => '<p>2014</p>'
                         ),
                         array(
                             'article' => 'Venue',
                             'body' => '<p>Chinnaswamy Stadium<br/>Bangalore, Karnataka, India</p>'
                         ),
                         array(
                             'article' => 'Capacity',
                             'body' => '<p>Seating Capacity: 55k<br/>Standing Capacity: 80k+</p>'
                         ),
                         array(
                             'article' => 'Talent',
                             'body' => '<p>* All artists are subject to change based on availability and booking fees.</p><ul><li>Armin Van Buuren</li><li>Sander Van Doorn</li><li>Chuckie</li><li>Steve Angello</li><li>Alesso</li><li>Axwell</li><li>Avicii</li><li>Dada Life</li><li>Afrojack</li><li>Sebastian Ingrosso</li><li>Lil Jon</li><li>Steve Aoki</li><li>Arty</li><li>Quintino</li><li>Porter Robinson</li><li>Skrillex</li><li>Markus Schulz</li><li>Cosmic Gate</li><li>ATB</li><li>Gareth Emery</li><li>Moby</li><li>John Digweed</li><li>Laidback Luke</li><li>Deadmau5</li><li>Tommy Trash</li><li>R3hab</li><li>Tiesto</li><li>David Guetta</li><li>Swanky Tunes</li><li>Thomas Gold</li><li>Nicky Romero</li><li>Pete Tong</li><li>EDX</li><li>Sunnery James & Ryan Marciano</li><li>BT</li><li>Bobby Burns</li><li>John O’Callaghan</li><li>Chris Lake</li><li>Knife Party</li><li>Infected Mushroom</li></ul>'
                         ),
                         array(
                             'article' => 'Attractions',
                             'body' => '<p>* All attractions are based on availability.</p><ul><li>3 Carnival Rides</li><li>Fireworks</li><li>Art Installments</li><li>Live Performers</li></ul>'
                         ),
                         array(
                             'article' => 'Vendors',
                             'body' => '<p>Local businesses can sell food and merchandise.</p>'
                         ),
                         array(
                             'article' => 'Sound / Stage / Lighting',
                             'body' => '<p>Equipment rental will be outsourced via DNA Networks.</p>'
                         ),
                         array(
                             'article' => 'Event Staff',
                             'body' => '<p>Security: Company Name<br/>Medical: <br/>Ticketing: <br/>Production: </br>Volunteers:</p>'
                         )
                     )
                 ),
                 array(
                     'section' => 'Promotion',
                     'articles' => array(
                         array(
                             'article' => 'Sales / Ticketing Outlets',
                             'body' => '<p>Online: <br/>Physical Locations:</p>'
                         ),
                         array(
                             'article' => 'Marketing',
                             'body' => '<p>DNA Networks will provide marketing services.</p>'
                         ),
                         array(
                             'article' => 'Media',
                             'body' => '<ul><li>TV</li><li>Radio</li><li>Online</li><li>Print</li></ul>'
                         )
                     )
                 ),
                 array(
                     'section' => 'Administration',
                     'articles' => array(
                         array(
                             'article' => 'Investors',
                             'body' => '<p>Investment Plans: <ul><li>Silver</li><li>Gold</li><li>Platinum</li></ul></p><p>Capital Investment: </p><p>ROI: </p><p>Fund Disbursement: </p>'
                         ),
                         array(
                             'article' => 'Accounting',
                             'body' => '<p>Accounting services will be provided by <b>Company Name</b></p>'
                         ),
                         array(
                             'article' => 'Legal',
                             'body' => '<p>Government Regulations: <ul><li>Permits</li><li>Laws</li></ul></p><p>Insurance: <ul><li>Venue</li><li>Attractions</li><li>Vendors</li></ul></p>'
                         )
                     )
                 ),
                 array(
                     'section' => 'Partners',
                     'articles' => array(
                         array(
                             'article' => 'Venue',
                             'body' => '<p>Chinnaswamy Stadium</p>'
                         ),
                         array(
                             'article' => 'Marketing',
                             'body' => '<p>Companies</p>'
                         ),
                         array(
                             'article' => 'Production',
                             'body' => '<p>Companies</p>'
                         ),
                         array(
                             'article' => 'Sponsors',
                             'body' => '<p>Companies</p>'
                         )
                     )
                 )
             );

             $project['contracts'] = array(
                 array(
                     'template' => 'projects-contracts',
                     'contract_name' => 'Non-disclosure Agreement',
                     'user_id' => 6,
                     'username' => 'investor',
                     'email' => 'email@fake.com',
                     'content' => array(),
                     'signature' => true
                 ),
                 array(
                     'template' => 'projects-contracts',
                     'contract_name' => 'Another Contract',
                     'user_id' => 6,
                     'username' => 'vendor',
                     'email' => 'email@fake.com',
                     'content' => array(),
                     'signature' => array()
                 ),
                 array(
                     'template' => 'projects-contracts',
                     'contract_name' => 'Non-disclosure Agreement',
                     'user_id' => 6,
                     'username' => 'bob',
                     'email' => 'email@fake.com',
                     'content' => array(),
                     'signature' => array()
                 ),
                 array(
                     'template' => 'projects-contracts',
                     'contract_name' => 'Another Contract',
                     'user_id' => 6,
                     'username' => 'jimmy jim',
                     'email' => 'email@fake.com',
                     'content' => array(),
                     'signature' => array()
                 ),
                 array(
                     'template' => 'projects-contracts',
                     'contract_name' => 'Another Contract',
                     'user_id' => 6,
                     'username' => 'vendor',
                     'email' => 'email@fake.com',
                     'content' => array(),
                     'signature' => array()
                 ),
                 array(
                     'template' => 'projects-contracts',
                     'contract_name' => 'Non-disclosure Agreement',
                     'user_id' => 6,
                     'username' => 'bob',
                     'email' => 'email@fake.com',
                     'content' => array(),
                     'signature' => array()
                 ),
                 array(
                     'template' => 'projects-contracts',
                     'contract_name' => 'Another Contract',
                     'user_id' => 6,
                     'username' => 'jimmy jim',
                     'email' => 'email@fake.com',
                     'content' => array(),
                     'signature' => array()
                 )
             );

            // Business Plan
            if ($access != 'admin' and $access != 'high') unset($project['biz_plan']);

            switch ($access) {
               case 'admin':
                  $project['sub_nav'][] = array('sub_page' => 'overview',  'title' => 'Overview');
                  $project['sub_nav'][] = array('sub_page' => 'contracts', 'title' => 'Contracts');
                  $project['sub_nav'][] = array('sub_page' => 'biz_plan',  'title' => 'Business Plan');
                  break;
               case 'high':
                  $project['sub_nav'][] = array('sub_page' => 'overview',  'title' => 'Overview');
                  $project['sub_nav'][] = array('sub_page' => 'contracts', 'title' => 'Contracts');
                  $project['sub_nav'][] = array('sub_page' => 'biz_plan',  'title' => 'Business Plan');
                  break;
               case 'low':
                  $project['sub_nav'][] = array('sub_page' => 'overview',  'title' => 'Overview');
                  $project['sub_nav'][] = array('sub_page' => 'contracts', 'title' => 'Contracts');
                  $project['contracts'] = array();
                  break;
               default:
            }

            $all_projects[] = $project;
         }
      }

      JSON::print_json($all_projects);
   }

   public function get_user_project_names()
   {
      $db = new DB();
      $project_names = array();

      $results = $db->select_from_where(array('*'), 'project_users', 'user_id', $_SESSION['user']['user_id']);
      foreach ($results as $row)
      {
         $p_name = $db->select_from_where(array('project'), 'projects', 'id', $row['proj_id']);
         $project_names[] = array('project' => $p_name[0]['project'], 'id' => $row['proj_id']);
      }

      JSON::print_json($project_names);
   }

}