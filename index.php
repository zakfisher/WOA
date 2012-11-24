<?php
/*
 *  Author: Zachary Fisher
 *  Project: WorldofAnarchy.com
 *
 *  Created: September 2012
 *  Last Updated: 11/24/12
 */

require_once('system/config.php');

// Header
require_once('view/themes/' . $theme . '/templates/global/header.php');

// Navigation
require_once('view/themes/' . $theme . '/templates/global/navigation.php');

// Main Content
require_once('view/themes/' . $theme . '/templates/pages/' . $page . '.php');

// Modals
require_once('view/themes/' . $theme . '/templates/modals/all.php');

// Footer
require_once('view/themes/' . $theme . '/templates/global/footer.php');