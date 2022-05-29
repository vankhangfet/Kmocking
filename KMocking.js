
function Mock()
{   
    return {
        
        mole: function(obj)
        {   
            this.mole = obj;
            this.exec = [];
            return this;
        },

        setup: function(funcCall)
        {  
           let param = funcCall.toString();
           let tempData = param.split(".")[1];
           let targetFunc = tempData.split("(")[0];
           this.exec[targetFunc] = 0;
           //console.log(targetFunc);
           this.targetFunc = targetFunc; 
           //this.funcCall = funcCall;
           //console.log(this);
           return this;
        },
        returns: function(value)
        {    
            //console.log("Invoke");
            //console.log("expected mocking:" + value)

            let proxied = this.mole[this.targetFunc]; 
            //console.log(proxied);
            this.mole.__invoked = this.exec[this.targetFunc];
            this.mole[this.targetFunc] = function(invoke) {
                invoke++;
                console.log(this);
                console.log("Invoke:" + invoke);
                return value;
            }
            //this.exec[this.targetFunc]++;
            // Number of invoke target function.
            //console.log(this.exec[this.targetFunc]++);
            return this.mole[this.targetFunc](this.mole.__invoked);
        },
        verify: function(func,times)
        {   
            // Need to check func again?
            console.log(times.checkingType);
            console.log(times.times);
            let currentInvoke = this.exec[this.targetFunc] -1;
            console.log(this.exec[this.targetFunc]);
            if(times.checkingType == InvokeType.exactly)
               return currentInvoke == times.times?true:false;
            if(times.checkingType == InvokeType.atLeast)
               return currentInvoke >= times.times?true:false;
        },
        throws: function(errorMessage)
        {   this.errorMessage = errorMessage;
            return this.errorMessage;
        }

    }
}

let InvokeType = {
    exactly: 'exactly',
    atLeast: 'atLeast'
}

function Times()
{   
    return {
      
        exact: function(times){
            return {
                     times: times,
                     checkingType: InvokeType.exactly
                   }
        },
        atLeast: function(times)
        {
            return {
                times:times,
                checkingType: InvokeType.atLeast
            };
        }

    };
}

module.exports = {
    Mock:Mock,
    Times: new Times()
}