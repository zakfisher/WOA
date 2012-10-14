<?php
session_start();
$items = array(
   'username'   => array('Username',         $_SESSION['user']['username'],   'left'),
   'email'      => array('Email',            $_SESSION['user']['email'],      'right'),
   'first_name' => array('First Name',       $_SESSION['user']['first_name'], 'left'),
   'last_name'  => array('Last Name',        $_SESSION['user']['last_name'],  'right'),
   'password'   => array('Password',         'password',                      'left'),
   'confirm_pw' => array('Confirm Password', 'password',                      'right')
);
?>
<div class="main-view">
   <div class="form">
      <?php foreach ($items as $key => $item): ?>
      <div class="input <?= $item[2]; ?>">
         <p><?= $item[0]; ?></p>
         <input type="<?= ($item[1] == 'password') ? 'password' : 'text'; ?>" name="<?= $key; ?>" value="<?= ($item[1] == 'password') ? '' : $item[1]; ?>" />
      </div>
      <?php if ($item[2] == 'right'): ?>
         <div class="clr"></div>
         <?php endif; ?>
      <?php endforeach; ?>
   </div>
   <!-- end .form -->
   <div class="submit-form">
      <p class="error left"></p>
      <div class="btn btn-inverse change-settings right">Save Changes</div>
   </div>
   <!-- end .submit-form -->
</div>
