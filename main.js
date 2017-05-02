jQuery(document).ready(function($) {
    $.fn.extend({
        mygame: function(size) {
            var gameObject = $(this).attr('id');
            var blockSize = size;
            var boardSize = blockSize * 4;

            //Création du plateu de jeu
            var createBoard = function() {
                $('#' + gameObject).append('<div id="board"></div>');
                $('#board').css({
                    'background-color': '#bbada0',
                    'width': boardSize,
                    'height': boardSize,
                    'align': 'center',
                    'display': 'flex',
                    'flex-wrap': 'wrap',
                    'margin': 'auto',
                    'margin-top': '60px',
                });
            };
            createBoard();

            //Création des cellules du plateau
            var createCells = function() {
                for (x = 0; x <= 15; x++) {
                    $('#board').append('<div id=' + x + ' class="square-container number0" hasMerged="false">' + "" + '</div>');
                }

                $('.square-container').css({
                    'background-color': 'rgba(238,228,218,0.35)',
                    'width': blockSize,
                    'height': blockSize,
                    'border-radius': '10px',
                    'box-shadow': 'inset 1px 1px 1px 1px',
                });
            };
            createCells();

            //Réinitialisation de l'état de départ du jeu au clique sur restart
            var startState = function() {
                for (x = 0; x <= 15; x++) {
                    prevState(x, 0);
                    tempState(x, 0);
                    $('#' + x).replaceWith('<div id=' + x + ' class="square-container number0" hasMerged="false">' + "" + '</div>');
                    $('#' + x).css({ 'width': blockSize, 'height': blockSize, 'border-radius': '10px', 'box-shadow': 'inset 1px 1px 1px 1px', });
                }
            }

            //Calcu de la somme des cellules fusionnées
            function calcul(add) {

                if (typeof calcul.counter == 'undefined') {
                    calcul.counter = 0;
                }
                calcul.counter = calcul.counter + add;
                return calcul.counter
            }

            //Mémorisation de l'état précédent du jeu pour revenir d'un en arrière
            function prevState(id, value) {
                if (typeof prevState.current == 'undefined') {
                    prevState.current = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                }
                prevState.current[id] = value;

                return prevState.current
            }

            function tempState(id, value) {
                if (typeof tempState.current == 'undefined') {
                    tempState.current = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                }
                tempState.current[id] = value;

                return tempState.current
            }

            var applyTempStateToPrevState = function() {
                var tab = tempState();
                for (i = 0; i <= 15; i++) {
                    prevState(i, tab[i])
                }
            }

            //Construction du tableau de cellules vides, pour savoir s'il est toujours possible de créer des cellules,
            //ou s'il faut s'assurer que le joueur n'est pas gameover
            var emptyCells = function() {
                var array = [];
                for (i = 0; i <= 15; i++) {
                    if ($('#' + i).text() == "") {
                        array.push(i);
                    };
                }
                return array;
            }

            //Choix aléatoire de la valeur des nouvelles cellules
            var randomFromArray = function(array) {
                rand = array[~~(Math.random() * array.length)];
                return rand
            }

            //Création des nouvelles cellules
            var createTiles = function() {
                var rand = randomFromArray(emptyCells());
                var rand24 = Math.floor(Math.random() * 2) + 1;
                if (rand24 == 1) {
                    rand24 = 2;
                } else {
                    rand24 = 4;
                }
                $('#' + rand).replaceWith('<div id=' + rand + ' class="square-container number' + rand24 + '" hasMerged="false">' + rand24 + '</div>');
                $('#' + rand).css({ 'width': blockSize, 'height': blockSize, 'border-radius': '10px', 'box-shadow': 'inset 1px 1px 1px 1px', });
                tempState(rand, rand24);
            };

            //Détermination du mouvement des cellules quand le joueur appuie sur "gauche", "droite", "haut" ou "bas"
            var compareCell = function(i, j, k, l) {
                //définition case 1
                if ($('#' + (l)).html() == "") {
                    switch (true) {
                        case ($('#' + (k)).html() != ""):
                            has_mooved = true;
                            gameover = false;
                            has_merged = false;
                            $('#' + (l)).replaceWith('<div id=' + (l) + ' class="square-container number' + ($('#' + (k)).html()) + '" hasMerged="false">' + ($('#' + (k)).html()) + '</div>');
                            $('#' + (l)).css({ 'width': blockSize, 'height': blockSize, 'border-radius': '10px', 'box-shadow': 'inset 1px 1px 1px 1px', });
                            tempState(l, ($('#' + (k)).html()));
                            $('#' + (k)).replaceWith('<div id=' + (k) + ' class="square-container number0" hasMerged="false"></div>');
                            $('#' + (k)).css({ 'width': blockSize, 'height': blockSize, 'border-radius': '10px', 'box-shadow': 'inset 1px 1px 1px 1px', });
                            tempState(k, 0)
                            break;
                        case ($('#' + (j)).html() != ""):
                            has_mooved = true;
                            gameover = false;
                            has_merged = false;
                            $('#' + (l)).replaceWith('<div id=' + (l) + ' class="square-container number' + ($('#' + (j)).html()) + '" hasMerged="false">' + ($('#' + (j)).html()) + '</div>');
                            $('#' + (l)).css({ 'width': blockSize, 'height': blockSize, 'border-radius': '10px', 'box-shadow': 'inset 1px 1px 1px 1px', });
                            tempState(l, ($('#' + (j)).html()));
                            $('#' + (j)).replaceWith('<div id=' + j + ' class="square-container number0" hasMerged="false"></div>');
                            $('#' + (j)).css({ 'width': blockSize, 'height': blockSize, 'border-radius': '10px', 'box-shadow': 'inset 1px 1px 1px 1px', });
                            tempState(j, 0)
                            break;
                        case ($('#' + (i)).html() != ""):
                            has_mooved = true;
                            gameover = false;
                            has_merged = false;
                            $('#' + (l)).replaceWith('<div id=' + (l) + ' class="square-container number' + ($('#' + (i)).html()) + '" hasMerged="false">' + ($('#' + (i)).html()) + '</div>');
                            $('#' + (l)).css({ 'width': blockSize, 'height': blockSize, 'border-radius': '10px', 'box-shadow': 'inset 1px 1px 1px 1px', });
                            tempState(l, ($('#' + (i)).html()));
                            $('#' + (i)).replaceWith('<div id=' + i + ' class="square-container number0" hasMerged="false"></div>');
                            $('#' + (i)).css({ 'width': blockSize, 'height': blockSize, 'border-radius': '10px', 'box-shadow': 'inset 1px 1px 1px 1px', });
                            tempState(i, 0)
                            break;
                    }
                    switch (($('#' + (l)).html() != "")) {
                        case ($('#' + (k)).html() == "" && $('#' + (l)).html() == $('#' + (j)).html()):
                            has_mooved = true;
                            mergeCell(l, j);
                            break;
                        case ($('#' + (k)).html() == "" && $('#' + (j)).html() == "" && $('#' + (l)).html() == $('#' + (i)).html()):
                            has_mooved = true;
                            mergeCell(l, i)
                            break;
                    }
                } else {
                    switch (true) {
                        case ($('#' + (l)).html() == $('#' + (k)).html()):
                            has_mooved = true;
                            mergeCell(l, k);
                            break;
                        case ($('#' + (k)).html() == "" && $('#' + (l)).html() == $('#' + (j)).html()):
                            has_mooved = true;
                            mergeCell(l, j)
                            break;
                        case ($('#' + (k)).html() == "" && $('#' + (j)).html() == "" && $('#' + (l)).html() == $('#' + (i)).html()):
                            has_mooved = true;
                            mergeCell(l, i)
                            break;
                    }
                }
                //définition case 2
                if ($('#' + (k)).html() == "") {
                    switch (true) {
                        case ($('#' + (j)).html() != ""):
                            has_mooved = true;
                            gameover = false;
                            has_merged = false;
                            $('#' + (k)).replaceWith('<div id=' + (k) + ' class="square-container number' + ($('#' + (j)).html()) + '" hasMerged="false">' + ($('#' + (j)).html()) + '</div>');
                            $('#' + (k)).css({ 'width': blockSize, 'height': blockSize, 'border-radius': '10px', 'box-shadow': 'inset 1px 1px 1px 1px', });
                            tempState(k, ($('#' + (j)).html()));
                            $('#' + (j)).replaceWith('<div id=' + j + ' class="square-container number0" hasMerged="false"></div>');
                            $('#' + (j)).css({ 'width': blockSize, 'height': blockSize, 'border-radius': '10px', 'box-shadow': 'inset 1px 1px 1px 1px', });
                            tempState(j, 0)
                            break;
                        case ($('#' + (i)).html() != ""):
                            has_mooved = true;
                            gameover = false;
                            has_merged = false;
                            $('#' + (k)).replaceWith('<div id=' + (k) + ' class="square-container number' + ($('#' + (i)).html()) + '" hasMerged="false">' + ($('#' + (i)).html()) + '</div>');
                            $('#' + (k)).css({ 'width': blockSize, 'height': blockSize, 'border-radius': '10px', 'box-shadow': 'inset 1px 1px 1px 1px', });
                            tempState(k, ($('#' + (i)).html()));
                            $('#' + (i)).replaceWith('<div id=' + i + ' class="square-container number0" hasMerged="false"></div>');
                            $('#' + (i)).css({ 'width': blockSize, 'height': blockSize, 'border-radius': '10px', 'box-shadow': 'inset 1px 1px 1px 1px', });
                            tempState(i, 0)
                            break;
                    }
                    if (($('#' + (k)).html() != "")) {
                        if ($('#' + (j)).html() == "" && ($('#' + (k)).html() == $('#' + (i)).html())) {
                            has_mooved = true;
                            gameover = false;
                            mergeCell(k, i)
                        }
                    }
                } else {
                    switch (true) {
                        case ($('#' + (k)).html() == $('#' + (j)).html()):
                            has_mooved = true;
                            mergeCell(k, j)
                            break;
                        case ($('#' + (j)).html() == "" && $('#' + (k)).html() == $('#' + (i)).html()):
                            has_mooved = true;
                            mergeCell(k, i)
                            break;
                    }
                }

                //définition case 3
                if ($('#' + (j)).html() == "") {
                    if ($('#' + (i)).html() != "") {
                        has_mooved = true;
                        gameover = false;
                        has_merged = false;
                        $('#' + (j)).replaceWith('<div id=' + (j) + ' class="square-container number' + ($('#' + (i)).html()) + '" hasMerged="false">' + ($('#' + (i)).html()) + '</div>');
                        $('#' + (j)).css({ 'width': blockSize, 'height': blockSize, 'border-radius': '10px', 'box-shadow': 'inset 1px 1px 1px 1px', });
                        tempState(j, ($('#' + (i)).html()));
                        $('#' + (i)).replaceWith('<div id=' + i + ' class="square-container number0" hasMerged="false"></div>');
                        $('#' + (i)).css({ 'width': blockSize, 'height': blockSize, 'border-radius': '10px', 'box-shadow': 'inset 1px 1px 1px 1px', });
                        tempState(i, 0)
                    }
                } else {
                    if ($('#' + (j)).html() == $('#' + (i)).html()) {
                        has_mooved = true;
                        mergeCell(j, i)
                    }
                }
            }

            //Détermination de l'état des cellules à fusionner
            var mergeCell = function(merged, cell) {
                gameover = false;
                has_merged = true;
                lastmerged = (2 * parseInt(($('#' + merged).html())))
                $('#' + merged).replaceWith('<div id=' + merged + ' class="square-container number' + (2 * parseInt(($('#' + merged).html()))) + '" hasMerged="true">' + (2 * parseInt(($('#' + merged).html()))) + '</div>');
                $('#' + merged).css({ 'width': blockSize, 'height': blockSize, 'border-radius': '10px', 'box-shadow': 'inset 1px 1px 1px 1px', });
                tempState(merged, (parseInt(($('#' + merged).html()))));
                $('#' + cell).replaceWith('<div id=' + cell + ' class="square-container number0" hasMerged="false"></div>');
                $('#' + cell).css({ 'width': blockSize, 'height': blockSize, 'border-radius': '10px', 'box-shadow': 'inset 1px 1px 1px 1px', });
                tempState(cell, 0)
                $('#calcul').replaceWith('<div id="calcul">' + calcul(parseInt(($('#' + merged).html()))) + '</div>');
            }

            //Détermination des paramètres à envoyer en fonction de la flèche pressée par le joueur
            var move = function(left, up, right, down) {

                if (simu == false) {
                    applyTempStateToPrevState();
                }

                if (left == 1) {
                    var i = 3;
                    var j = 2;
                    var k = 1;
                    var l = 0;

                    while (i < 16) {
                        compareCell(i, j, k, l);
                        i = i + 4;
                        j = j + 4;
                        k = k + 4;
                        l = l + 4;

                    }
                    if (has_mooved == true) {
                        createTiles();
                        has_mooved = false;
                    }
                } else if (up == 1) {
                    var i = 12;
                    var j = 8;
                    var k = 4;
                    var l = 0;

                    while (i < 16) {

                        compareCell(i, j, k, l);
                        i++;
                        j++;
                        k++;
                        l++;
                    }
                    if (has_mooved == true) {
                        createTiles();
                        has_mooved = false;
                    }
                } else if (right == 1) {
                    var i = 0;
                    var j = 1;
                    var k = 2;
                    var l = 3;

                    while (i < 16) {

                        compareCell(i, j, k, l);
                        i = i + 4;
                        j = j + 4;
                        k = k + 4;
                        l = l + 4;
                    }
                    if (has_mooved == true) {
                        createTiles();
                        has_mooved = false;
                    }
                } else if (down == 1) {
                    var i = 0;
                    var j = 4;
                    var k = 8;
                    var l = 12;

                    while (i < 4) {

                        compareCell(i, j, k, l);
                        i++;
                        j++;
                        k++;
                        l++;
                    }
                    if (has_mooved == true) {
                        createTiles();
                        has_mooved = false;
                    }
                }
                //Point d'entrée d'éventuelle simulation du prochain coup,
                //pour s'assurer que le joueur n'est pas gameover
                if (simu == false) {
                    var empty = emptyCells();
                    if (empty.length == 0) {
                        simu = true
                        over();
                    }
                }
                $('#back').show();
                cangetback = true;
            }

            //Simulation, le joueur est-il gameover
            var over = function() {
                gameover = true;
                if (gameover == true) {
                    move(1, 0, 0, 0);
                    if (gameover == true) {
                        move(0, 1, 0, 0);
                        if (gameover == true) {
                            move(0, 0, 1, 0);
                            if (gameover == true) {
                                move(0, 0, 0, 1);
                                if (gameover == true) {
                                    $('#gameover').replaceWith('<div id="gameover">' + "<p><strong>gameover</strong></p>" + '</div>');
                                    return
                                } else {
                                    has_mooved = false;
                                    getback();
                                    simu = false;
                                }
                            } else {
                                has_mooved = false;
                                getback();
                                simu = false;
                            }
                        } else {
                            has_mooved = false;
                            getback();
                            simu = false;
                        }
                    } else {
                        has_mooved = false;
                        getback();
                        simu = false;
                    }
                }
            }

            //Retour d'un en arrière possible
            var getback = function() {
                tab = prevState();
                cangetback = true;
                if (cangetback == true) {
                    if (started == true) {
                        for (i = 0; i <= 15; i++) {
                            if (tab[i] == 0) {
                                $('#' + i).replaceWith('<div id=' + i + ' class="square-container number' + tab[i] + '" hasMerged="true">' + "" + '</div>');
                                $('#' + i).css({ 'width': blockSize, 'height': blockSize, 'border-radius': '10px', 'box-shadow': 'inset 1px 1px 1px 1px', });
                            } else {
                                $('#' + i).replaceWith('<div id=' + i + ' class="square-container number' + tab[i] + '" hasMerged="true">' + tab[i] + '</div>');
                                $('#' + i).css({ 'width': blockSize, 'height': blockSize, 'border-radius': '10px', 'box-shadow': 'inset 1px 1px 1px 1px', });
                            }
                        }
                        if (has_merged == true) {
                            nbr = -lastmerged;
                            calcul(nbr);
                            $('#calcul').replaceWith('<div id="calcul">' + calcul(0) + '</div>');
                        }
                    }
                    $('#back').hide();
                }
            }

            $("#back").click(function() {
                getback();
            });

            //Point de démarrage du jeu, au clique sur start
            $("#start").click(function() {
                var reset = calcul(0);
                reset = -reset;
                calcul(reset);
                startState()
                createTiles();
                createTiles();
                $('#start').hide();
                started = true;
                simu = false;
            });

            $("#restart").click(function() {
                var reset = calcul(0);
                reset = -reset;
                calcul(reset);
                startState();
                createTiles();
                createTiles();
                $('#calcul').replaceWith('<div id="calcul">' + calcul(0) + '</div>');
            });

            //Catch de l'action du joueur sur les flèches
            $(document).keydown(function(e) {
                has_mooved = false;
                simu = false;
                if (started === true) {
                    switch (e.which) {
                        case 37:
                            move(1, 0, 0, 0); //left
                            break;
                        case 38:
                            move(0, 1, 0, 0); //up
                            break;
                        case 39:
                            move(0, 0, 1, 0); //right
                            break;
                        case 40:
                            move(0, 0, 0, 1); //down
                            break;
                    }
                }
            });
        }
    });
});

$(function() { $('#firstdiv').mygame(135); });