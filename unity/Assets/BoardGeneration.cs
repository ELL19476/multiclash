using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
public class BoardGeneration : MonoBehaviour
{
    public int sizeX;
    public int sizeY;
    public Vector3 startPos;
    public List<GameObject> positionsList = new List<GameObject>();
    public  List<Material> boardMaterial = new List<Material>();
    public float cameraZoom;
    [Header("Test")]
    public GameObject testObject;

    public Action onGenerateBoard;
    Tuple<int, int> defaultTuple = Tuple.Create(-1, -1);
    public Tuple<int, int> placeCoordinates;
    public string color = "#ffffff";

    bool snapped = false;
    GameObject boardContainer;

    private void OnEnable()
    {
        placeCoordinates = defaultTuple;
    }

    public void Clear()
    {
        for (int i = 0; i < positionsList.Count; i++)
        {
            GameObject go = positionsList[i];
            DestroyImmediate(go);

        }

        positionsList = new List<GameObject>();
        DestroyImmediate(boardContainer);
    }
    public void GenerateBoard()
    {
        boardContainer = new GameObject();
        boardContainer.name = "BoardContainer";


        for (int y = 0; y < sizeY; y++)
        {
            for (int x = 0; x < sizeX; x++)
            {
                GameObject go = GameObject.CreatePrimitive(PrimitiveType.Cube);
                go.transform.position = startPos + Vector3.forward * y + Vector3.right * x;
                go.transform.parent = boardContainer.transform;
                go.gameObject.name = $"BoardFragment X:{x} Y:{y}";
              //  go.GetComponent<MeshRenderer>().material = boardMaterial;
                positionsList.Add(go);
            }
        }

        bool evenBoard = !(sizeX % 2 != 0 && sizeY % 2 != 0);
        for (int i = 0; i < positionsList.Count; i++)
        {
            if (!evenBoard)
            {
                if (i % 2 == 0)
                    positionsList[i].GetComponent<MeshRenderer>().material= boardMaterial[1];
                else
                    positionsList[i].GetComponent<MeshRenderer>().material = boardMaterial[0];
            }
                
        }
        if (evenBoard)
        {
            bool flip = false;
            int i = 0;
            for (int y = 0; y < sizeY; y++)
            {
                for (int x = 0; x < sizeX; x++)
                {
                    Color meshCol = new Color();
                    if (i % 2 == 0)
                        positionsList[i].GetComponent<MeshRenderer>().material = boardMaterial[flip ? 1 : 0];
                    else
                        positionsList[i].GetComponent<MeshRenderer>().material = boardMaterial[flip ? 0 : 1];
    
                    i++;
                }
                flip = !flip;
            }
        }
        Camera.main.gameObject.transform.position = startPos + new Vector3((sizeX-1f) / 2 ,0, (sizeY-1f ) / 2);
        Camera.main.orthographicSize =(sizeX>sizeY? sizeX: sizeY)*cameraZoom;

        onGenerateBoard?.Invoke();
    }

    private void Update()
    {
        lock (placeCoordinates)
        {
            if (placeCoordinates == defaultTuple) return;
            lock(color)
            {
                Place(placeCoordinates.Item1, placeCoordinates.Item2);
            }
            placeCoordinates = defaultTuple;
        }
    }

    private void Place(int x, int y)
    {
        print("PLACE!!!");
        int i = x + y * sizeY;
        Color col;
        if (!ColorUtility.TryParseHtmlString(color, out col)) col = Color.magenta;
        Instantiate(testObject, positionsList[i].transform).GetComponent<Renderer>().material.color = col;
    }
}
