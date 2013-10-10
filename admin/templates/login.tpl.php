<div id="login" class="container">

    <form class="form-signin" method="post">
        <div class="logo">
            <?php require('../ui/images/edmcake_logo.svg'); ?>
            <p>Admin Panel</p>
        </div>
        <input type="text" class="form-control" placeholder="Username" autofocus="" name="username">
        <input type="password" class="form-control" placeholder="Password" name="password">
<!--        <label class="checkbox">-->
<!--            <input type="checkbox" value="remember-me"> Remember me-->
<!--        </label>-->
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <br/>
        <a href="/">&laquo; Back to EDM Cake</a>
    </form>

</div>