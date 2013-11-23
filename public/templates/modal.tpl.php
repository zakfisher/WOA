<!-- Modal Wrapper -->
<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;">
    <div class="modal-dialog">
        <div class="alert alert-dismissable" style="display:none;">
            <button type="button" class="close" aria-hidden="true"><i class="icon-remove"></i></button>
            <p></p>
        </div>
        <div class="modal-content">
        </div>
    </div>
</div>

<!-- Login -->
<script id="template-login" type="text/x-handlebars-template">
    <span id="login">
        <form class="form-signin" method="post">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="icon-remove"></i></button>
                <h4 class="modal-title">
                    <span class="default-font">My Account</span>
                </h4>
            </div>
            <div class="modal-body">
                <input type="text" class="form-control" placeholder="Username" autofocus="" name="username">
                <input type="password" class="form-control" placeholder="Password" name="password">
                <label class="checkbox default-font" style="margin:15px 0 0 0;">
                    <input type="checkbox" value="remember-me"> Remember me
                </label>
            </div>
            <div class="modal-footer">
                <div style="clear: both;"></div>
                <button class="btn btn-primary pull-left" type="submit">Log in</button>
                <button class="btn btn-primary">Sign Up</button>
<!--            <button class="btn btn-primary btn-block" type="button">Forgot Password</button>-->
            </div>
        </form>
    </span>
</script>

<!-- User Menu -->
<script id="template-user-menu" type="text/x-handlebars-template">
    <span id="user-menu">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="icon-remove"></i></button>
            <h4 class="modal-title">
                <i class="icon-user" style="margin-right:10px;"></i>
            </h4>
        </div>
        <div class="modal-body clearfix">
            <a class="logout" data-href="/?logout=true">
                <button class="btn btn-primary pull-right">Log out</button>
            </a>
            <!--<div class="list-group">-->
                <!--<a href="/?logout=true" class="list-group-item">Log out</a>-->
                <!--<a href="#" class="list-group-item">Dapibus ac facilisis in</a>-->
                <!--<a href="#" class="list-group-item">Morbi leo risus</a>-->
                <!--<a href="#" class="list-group-item">Porta ac consectetur ac</a>-->
                <!--<a href="#" class="list-group-item">Vestibulum at eros</a>-->
            <!--</div>-->
        </div>
        <!--<div class="modal-footer">-->
        <!--    <a href="/?logout=true">-->
        <!--        <button class="btn btn-primary btn-block">Log out</button>-->
        <!--    </a>-->
        <!--</div>-->
    </span>

</script>