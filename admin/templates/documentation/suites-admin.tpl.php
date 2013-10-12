<?php
$controller = new AdminController();
$controllerMethods = $controller->getMethods();
$model = new AdminModel();
$modelMethods = $model->getMethods();
?>

<div class="container">

    <!-- Controller -->
    <div class="row row-offcanvas row-offcanvas-right col-xs-12 col-sm-6">
        <div class="list-group">
            <a href="#" class="list-group-item active">AdminController</a>
        </div>
        <div class="panel-group" id="controller">
            <?php foreach ($controllerMethods as $m => $details): ?>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a class="accordion-toggle" data-toggle="collapse" data-parent="#controller" href="#collapse-controller-<?=$m?>">
                                <?=$m?>
                            </a>
                        </h4>
                    </div>
                    <div id="collapse-controller-<?=$m?>" class="panel-collapse collapse in">
                        <div class="panel-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>

    <!-- Model -->
    <div class="model row row-offcanvas row-offcanvas-right col-xs-12 col-sm-6">
        <div class="list-group">
            <a href="#" class="list-group-item active">AdminModel</a>
        </div>
        <div class="panel-group" id="model">
            <?php foreach ($modelMethods as $m => $details): ?>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a class="accordion-toggle" data-toggle="collapse" data-parent="#model" href="#collapse-model-<?=$m?>">
                                <?=$m?>
                            </a>
                        </h4>
                    </div>
                    <div id="collapse-model-<?=$m?>" class="panel-collapse collapse in">
                        <div class="panel-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>

</div>
