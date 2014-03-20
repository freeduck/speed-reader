var speedreader = speedreader||{};
(function (namespace,$){
    namespace.display = function (text){
        var words,currentWord,output;
        if (Object.prototype.toString.call( text ) !== '[object String]' || text.length === 0){
            return;
        }
        words = text.split ();
        currentWord = words.shift ();
        output = padString (currentWord);
        $ (function (){
            $ ('#current-word').text (output);
        });
    };

    function padString (word){
        var padding = '                     ';//TODO get padding from template
        return (padding + word).slice (-21);
    }

    namespace.createReader = function(domElement){

    };
}) (speedreader,jQuery);

speedreader.display ('world');
