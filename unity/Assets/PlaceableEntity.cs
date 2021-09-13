using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class PlaceableEntity : MonoBehaviour
{
    public Vector3 _destination;
    public float radius = 10;
    NavMeshAgent agent;
    public Collider dest = null;
    // Start is called before the first frame update
    void Start()
    {
        agent = GetComponent<NavMeshAgent>();
    }

    // Update is called once per frame
    void Update()
    {
        //agent.destination = new Vector3(11, 0, 3);
        Collider[] inRange = Physics.OverlapSphere(transform.position, radius);
        
        float dist = float.MaxValue;
        foreach (Collider col in inRange)
        {
            if ((col.transform.position - transform.position).magnitude < dist)
            {
                dest = col;
            }
        }
        if (dest != null)
            _destination = dest.transform.position;
        agent.destination = _destination;
    }
}
