
<?php

$file = "pdf/conseil_ecole/compte rendu CE du 7 février  2017.pdf";


header("Content-Length: ".filesize($file));
header("Content-Disposition: attachment; filename=".$file);
header("Location:".$file);