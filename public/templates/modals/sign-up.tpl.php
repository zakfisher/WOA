<script id="template-sign-up" type="text/x-handlebars-template">
    <span id="sign-up">
        <form class="form-signup" method="post">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="icon-remove"></i></button>
                <h4 class="modal-title">
                    <span class="default-font">New Account</span>
                </h4>
            </div>
            <div class="modal-body">
                <input type="text" class="form-control" placeholder="First Name" name="firstname">
                <input type="text" class="form-control" placeholder="Last Name" name="lastname">
                <input type="text" class="form-control" placeholder="Email" name="email">
                <input type="text" class="form-control" placeholder="Username" name="username">
                <input type="password" class="form-control" placeholder="Password" name="password">
                <input type="password" class="form-control" placeholder="Confirm Password" name="confirm-password">
                <!--<label class="checkbox default-font" style="margin:15px 0 0 0;">-->
                    <!--<input type="checkbox" value="remember-me"> Remember me-->
                <!--</label>-->
            </div>
            <div class="modal-footer">
                <div style="clear: both;"></div>
                <button class="btn btn-primary pull-left login" type="button">Log in</button>
                <button class="btn btn-primary submit" type="submit">Sign Up</button>
                <!--            <button class="btn btn-primary btn-block" type="button">Forgot Password</button>-->
            </div>
        </form>
    </span>
</script>