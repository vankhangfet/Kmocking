
function Mock()
{   
    return {
        
        mole: function(obj)
        {   
            this.mole = obj;
            return this;
        },

        setup: function(funcCall)
        {  
           let param = funcCall.toString();
           let tempData = param.split(".")[1];
           let targetFunc = tempData.split("(")[0];
           //console.log(targetFunc);
           this.targetFunc = targetFunc; 
           //this.funcCall = funcCall;
           //console.log(this);
           return this;
        },
        returns: function(value)
        {    
            console.log("Invoke");
             //console.log("expected mocking:" + value)
             let proxied = this.mole[this.targetFunc]; 
             //console.log(proxied);
             this.mole[this.targetFunc] = function() {
                return value;
            }
            return this.mole[this.targetFunc]();
        },
        verify: function(func,times)
        {
            
        },
        throws: function()
        {
            return this;
        }

    }
}

function Exact(times)
{
    return times;
}

module.exports = {
    Mock:Mock,
    Exact:Exact
}