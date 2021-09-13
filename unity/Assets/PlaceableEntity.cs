using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class PlaceableEntity : MonoBehaviour
{
<<<<<<< HEAD
    public Vector3 _destination;
=======
>>>>>>> parent of cb2724c... Revert "navmesh setup"
    NavMeshAgent agent;
    // Start is called before the first frame update
    void Start()
    {
        agent = GetComponent<NavMeshAgent>();
    }

    // Update is called once per frame
    void Update()
    {
        //transform.Translate(Vector3.forward * Time.deltaTime);
<<<<<<< HEAD
        agent.destination = 
=======
        agent.destination = new Vector3(11, 0, 3);
>>>>>>> parent of cb2724c... Revert "navmesh setup"
    }
}
