export const goveranceContractMeta = {
  governance: {
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'previousAdmin',
            type: 'address'
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'newAdmin',
            type: 'address'
          }
        ],
        name: 'AdminChanged',
        type: 'event'
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'beacon',
            type: 'address'
          }
        ],
        name: 'BeaconUpgraded',
        type: 'event'
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint8',
            name: 'version',
            type: 'uint8'
          }
        ],
        name: 'Initialized',
        type: 'event'
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'account',
            type: 'address'
          }
        ],
        name: 'Paused',
        type: 'event'
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'proposalId',
            type: 'uint256'
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'canceledBy',
            type: 'address'
          }
        ],
        name: 'ProposalCanceled',
        type: 'event'
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'proposalId',
            type: 'uint256'
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'proposer',
            type: 'address'
          },
          {
            indexed: false,
            internalType: 'address[]',
            name: 'targets',
            type: 'address[]'
          },
          {
            indexed: false,
            internalType: 'bytes[]',
            name: 'calldatas',
            type: 'bytes[]'
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'startBlock',
            type: 'uint256'
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'endBlock',
            type: 'uint256'
          }
        ],
        name: 'ProposalCreated',
        type: 'event'
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'proposalId',
            type: 'uint256'
          }
        ],
        name: 'ProposalExecuted',
        type: 'event'
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'role',
            type: 'bytes32'
          },
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'previousAdminRole',
            type: 'bytes32'
          },
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'newAdminRole',
            type: 'bytes32'
          }
        ],
        name: 'RoleAdminChanged',
        type: 'event'
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'role',
            type: 'bytes32'
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address'
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'sender',
            type: 'address'
          }
        ],
        name: 'RoleGranted',
        type: 'event'
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'role',
            type: 'bytes32'
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'account',
            type: 'address'
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'sender',
            type: 'address'
          }
        ],
        name: 'RoleRevoked',
        type: 'event'
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'account',
            type: 'address'
          }
        ],
        name: 'Unpaused',
        type: 'event'
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'implementation',
            type: 'address'
          }
        ],
        name: 'Upgraded',
        type: 'event'
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'voter',
            type: 'address'
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'proposalId',
            type: 'uint256'
          },
          {
            indexed: false,
            internalType: 'uint8',
            name: 'voteType',
            type: 'uint8'
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'votes',
            type: 'uint256'
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'reason',
            type: 'string'
          }
        ],
        name: 'VoteCast',
        type: 'event'
      },
      {
        inputs: [],
        name: 'DEFAULT_ADMIN_ROLE',
        outputs: [
          {
            internalType: 'bytes32',
            name: '',
            type: 'bytes32'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_proposalId',
            type: 'uint256'
          }
        ],
        name: 'cancel',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [],
        name: 'cancelThreshold',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_proposalId',
            type: 'uint256'
          },
          {
            internalType: 'uint8',
            name: '_voteType',
            type: 'uint8'
          }
        ],
        name: 'castVote',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_proposalId',
            type: 'uint256'
          },
          {
            internalType: 'uint8',
            name: '_voteType',
            type: 'uint8'
          },
          {
            internalType: 'string',
            name: 'reason',
            type: 'string'
          }
        ],
        name: 'castVoteWithReason',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'proposalId',
            type: 'uint256'
          }
        ],
        name: 'execute',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [],
        name: 'getActiveProposals',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [],
        name: 'getParams',
        outputs: [
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16'
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16'
          },
          {
            internalType: 'uint8',
            name: '',
            type: 'uint8'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_proposalId',
            type: 'uint256'
          }
        ],
        name: 'getProposalDetails',
        outputs: [
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16'
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16'
          },
          {
            internalType: 'address',
            name: '',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          },
          {
            internalType: 'address[]',
            name: '',
            type: 'address[]'
          },
          {
            internalType: 'bytes[]',
            name: '',
            type: 'bytes[]'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'bytes32',
            name: 'role',
            type: 'bytes32'
          }
        ],
        name: 'getRoleAdmin',
        outputs: [
          {
            internalType: 'bytes32',
            name: '',
            type: 'bytes32'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_proposalId',
            type: 'uint256'
          }
        ],
        name: 'getVotes',
        outputs: [
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16'
          },
          {
            internalType: 'uint16',
            name: '',
            type: 'uint16'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'bytes32',
            name: 'role',
            type: 'bytes32'
          },
          {
            internalType: 'address',
            name: 'account',
            type: 'address'
          }
        ],
        name: 'grantRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'bytes32',
            name: 'role',
            type: 'bytes32'
          },
          {
            internalType: 'address',
            name: 'account',
            type: 'address'
          }
        ],
        name: 'hasRole',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_proposalId',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: '_account',
            type: 'address'
          }
        ],
        name: 'hasVoted',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'targets',
            type: 'address[]'
          },
          {
            internalType: 'bytes[]',
            name: 'calldatas',
            type: 'bytes[]'
          }
        ],
        name: 'hashProposal',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'pure',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'admin',
            type: 'address'
          },
          {
            internalType: 'contract IERC20',
            name: '_token',
            type: 'address'
          },
          {
            internalType: 'uint8',
            name: 'quorumThreshold',
            type: 'uint8'
          },
          {
            internalType: 'uint16',
            name: 'voteThresholdNum',
            type: 'uint16'
          },
          {
            internalType: 'uint16',
            name: 'voteThresholdDen',
            type: 'uint16'
          }
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [],
        name: 'pause',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [],
        name: 'paused',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [],
        name: 'proposalPayable',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address'
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes'
          }
        ],
        name: 'propose',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'targets',
            type: 'address[]'
          },
          {
            internalType: 'bytes[]',
            name: 'calldatas',
            type: 'bytes[]'
          }
        ],
        name: 'proposeMulti',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [],
        name: 'proxiableUUID',
        outputs: [
          {
            internalType: 'bytes32',
            name: '',
            type: 'bytes32'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_proposalId',
            type: 'uint256'
          }
        ],
        name: 'quorumReached',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'bytes32',
            name: 'role',
            type: 'bytes32'
          },
          {
            internalType: 'address',
            name: 'account',
            type: 'address'
          }
        ],
        name: 'renounceRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'bytes32',
            name: 'role',
            type: 'bytes32'
          },
          {
            internalType: 'address',
            name: 'account',
            type: 'address'
          }
        ],
        name: 'revokeRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_cancelThreshold',
            type: 'uint256'
          }
        ],
        name: 'setCancelThreshold',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_fee',
            type: 'uint256'
          }
        ],
        name: 'setProposalPayable',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'uint8',
            name: '_quorumThreshold',
            type: 'uint8'
          }
        ],
        name: 'setQuorumThreshold',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_votingPeriod',
            type: 'uint256'
          }
        ],
        name: 'setVotingPeriod',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'uint16',
            name: '_num',
            type: 'uint16'
          },
          {
            internalType: 'uint16',
            name: '_den',
            type: 'uint16'
          }
        ],
        name: 'setVotingThreshold',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_proposalId',
            type: 'uint256'
          }
        ],
        name: 'state',
        outputs: [
          {
            internalType: 'enum IGovernor.ProposalState',
            name: '',
            type: 'uint8'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4'
          }
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [],
        name: 'unpause',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newImplementation',
            type: 'address'
          }
        ],
        name: 'upgradeTo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newImplementation',
            type: 'address'
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes'
          }
        ],
        name: 'upgradeToAndCall',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_proposalId',
            type: 'uint256'
          }
        ],
        name: 'voteApproved',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [],
        name: 'votingPeriod',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      }
    ],
    addresses: [
      {
        networkId: 0,
        networkName: 'bscTestnet',
        chainId: 97,
        address: '0xA74d3586CD21c7251ab55908F0c1B2EadEcA71C2'
      }
    ]
  }
}
