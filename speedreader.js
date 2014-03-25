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
          this.spaces.html(spacePadding + this.wordDecorator.highlightWord(word));
      },
      displayText: function(text, callback){
          var words = text.split(/\s+/), i, prev = new Date(), next;
          console.log(words.length);
          var self = this;
          function nextWord(pos){
              next = new Date
              if(pos === words.length){
                  callback(null);
                  return;
              }
              self.showWord(words[pos]);
              setTimeout(nextWord.bind(null, pos + 1), self.wordPerMinuteRatio);
          }
          nextWord(0);
      }
    };
    namespace.createReader = function(selector){
        var reader = new Reader($(selector).get(0), namespace.service('wordProcessor'), namespace.service('wordDecorator'));
        return reader;
    };
}) (speedreader,jQuery);

jQuery(function(){
    var reader = speedreader.createReader('#reader'), start;
    reader.wordPerMinuteRatio = 60/400*1000;
    var text = jQuery('#dummy-text').text();
    start = new Date();
    reader.displayText(text, function(err){
        if(err && typeof console !== 'undefined'){
            console.log(err);
            return;
        }
        var end = new Date();
        var time = new Date();
        console.log((end-start)/1000/60);
        console.log(end-start);
    });
});
