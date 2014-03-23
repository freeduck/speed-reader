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

    function Reader(element, wordProcessor, wordDecorator){
        this.instance = $(element);
        this.spaces = this.instance.find('.word-spacer');
        this.spacesContent = this.spaces.text();
        this.spacesLength = this.spacesContent.match(/\u00A0/g).length;
        this.wordProcessor = wordProcessor;
        this.wordDecorator = wordDecorator;
    }

    Reader.prototype = {
      showWord : function(word){
          var spacePadding = this.wordProcessor.getSpacePadding(word, this.spacesLength);
          var wordSplitLength = Math.ceil(word.length/2) + 1;
          var sliceLength = this.spacesLength + wordSplitLength;
          var textOutput = (this.spacesContent + word).slice(-sliceLength);

          this.spaces.text(textOutput);
          console.log(this.spacesLength + (word.length - wordSplitLength));
          console.log(textOutput.substring(0, this.spacesLength + (word.length - wordSplitLength - 2)));
      }
    };
    namespace.createReader = function(selector){
        var reader = new Reader($(selector).get(0), namespace.service('wordProcessor'), namespace.service('wordDecorator'));
        return reader;
    };
}) (speedreader,jQuery);


jQuery(function(){
    var reader = speedreader.createReader('#reader');
    reader.showWord('ooooooo');
});
