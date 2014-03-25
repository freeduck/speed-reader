var speedreader = speedreader||{};
(function(namespace, $){
    var services = {};
    function Service(name){
        var args = Array.prototype.slice.call(arguments, 1);
        if(args.length > 0){
            services[name] = args[0];
            return true;
        }
        if(typeof services[name] === 'undefined'){
            console.log(services);
            throw 'No service named: ' + name;
        }
        return services[name];
    }

    namespace.service = Service;
})(speedreader, jQuery);



