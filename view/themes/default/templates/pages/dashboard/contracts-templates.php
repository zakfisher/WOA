<?php session_start(); ?>

         <!-- Signature -->
         <script id="template-add-signature" type="text/x-handlebars-template">
             <div class="sigPad">
                 <label for="name">Print your name</label>
                 <input type="text" name="name" id="name" class="name">
                 <p class="typeItDesc">Review your signature</p>
                 <p class="drawItDesc">Draw your signature</p>
                 <ul class="sigNav">
                     <li class="typeIt"><a href="#type-it" class="current">Type It</a></li>
                     <li class="drawIt"><a href="#draw-it">Draw It</a></li>
                     <li class="clearButton"><a href="#clear">Clear</a></li>
                 </ul>
                 <div class="sig sigWrapper">
                     <div class="typed"></div>
                     <canvas class="pad" width="198" height="55"></canvas>
                     <input type="hidden" name="output" class="output">
                 </div>
             </div>
         </script>
