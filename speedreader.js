// Speed reader -- Use rapid serial visual presentation (RSVP) and optimal recognition point to read texts faster.
// Copyright (C) 2013  Kristian Nygaard Jensen

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
          var words = this.wordProcessor.getWords(text), i, prev = new Date(), next;
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
